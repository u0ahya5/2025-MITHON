import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase'; // Firebase 인증 인스턴스만 가져옵니다.

const UserContext = createContext();

// UserProvider - 전역 상태 관리 및 제공
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // 현재 로그인된 사용자 정보 (uid 포함)
  const [loading, setLoading] = useState(true);         // 인증 상태 로딩 여부

  // 컴포넌트 마운트 시 Firebase Auth 상태 변경 감지 (로그인 여부를 파악)
  useEffect(() => {
    // Firebase Auth의 onAuthStateChanged는 로그인/로그아웃 상태가 변경될 때마다 호출됩니다.
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user); // user 객체가 null이면 로그아웃, 객체면 로그인 상태
      setLoading(false);    // 초기 로딩 완료
    });

    // 컴포넌트 언마운트 시 구독 해제 (메모리 누수 방지)
    return unsubscribe;
  }, []); // 빈 배열: 최초 한 번만 실행됩니다.

  //Context에서 제공할 값들 (최소 정보만 제공)
  const value = {
    currentUser, // 사용자 ID (currentUser.uid)
    loading //currentUser가 null일때 에러 방지 (currentUser가 null인지 아닌지)
  };

  return (
    <UserContext.Provider value={value}>
      {/* 로딩 중일 때는 로딩 UI를 보여주고, 완료되면 자식 컴포넌트 렌더링 */}
      {loading ? <div>사용자 정보를 불러오는 중...</div> : children}
    </UserContext.Provider>
  );
};

// 4. useUser 커스텀 훅: UserContext를 쉽게 사용하기 위한 훅
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser 훅은 UserProvider 안에서 사용해야 합니다.');
  }
  return context;
};