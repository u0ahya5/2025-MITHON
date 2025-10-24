// src/pages/C_MyPage/MyPage.jsx

import { createContext, useContext, useState } from "react";
import { useUser } from '../../context/UserContext'; // 로그인 사용자 정보 조회
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase'; // Firestore 인스턴스

function MyPage() {
  const { currentUser, loading } = useUser();
  const [myComments, setMyComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    if (!loading && currentUser) {
      // 내가 작성한 댓글만 쿼리
      const fetchComments = async () => {
        setLoadingComments(true);
        try {
          const commentsRef = collection(db, 'comments'); // 댓글 컬렉션 이름이 'comments'라고 가정
          const q = query(commentsRef, where('authorId', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);
          const commentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMyComments(commentList);
        } catch (error) {
          console.error('댓글 불러오기 실패:', error);
        }
        setLoadingComments(false);
      };
      fetchComments();
    }
  }, [loading, currentUser]);

  if (loading || loadingComments) {
    return <p>댓글을 불러오는 중입니다...</p>;
  }

  if (!currentUser) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>{currentUser.email} 님의 작성한 댓글</h2>
      {myComments.length === 0 && <p>작성한 댓글이 없습니다.</p>}
      <ul>
        {myComments.map(comment => (
          <li key={comment.id} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
            <p>{comment.text /* 댓글 내용 필드명은 실제 데이터에 맞게 수정하세요 */}</p>
            <small>좋아요 {comment.likes || 0}개</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyPage;