// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { auth } from "../services/firebase"; // firebase.js 안에 auth가 export되어 있어야 함
import { onAuthStateChanged } from "firebase/auth";

// ✅ UserContext를 named export로 내보냄
export const UserContext = createContext();

// ✅ Provider 컴포넌트 정의
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 현재 로그인된 유저 정보
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // Firebase 인증 상태 감시
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
}

// 4. useUser 커스텀 훅: UserContext를 쉽게 사용하기 위한 훅
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser 훅은 UserProvider 안에서 사용해야 합니다.');
  }
  return context;
};