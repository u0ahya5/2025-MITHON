// src/pages/Mypage/MyPage.jsx
import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";

function MyPage() {
    const [myComments, setMyComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✨ 현재 로그인한 사용자 ID ✨
    // 이 부분은 실제 애플리케이션에서는 Firebase Authentication 등으로 로그인된
    // 사용자의 uid (unique ID)를 가져와야 합니다.
    // 예시에서는 임시로 하드코딩된 ID를 사용합니다.
    const currentUserId = "awesomeUser123"; // ⭐ 여기에 실제 로그인 사용자 ID를 넣으세요!
    // 실제라면 Firebase Auth의 user 객체에서 가져올 거예요:
    // const auth = getAuth(app);
    // const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

    useEffect(() => {
        // currentUserId가 없으면(로그아웃 상태) 댓글을 가져오지 않습니다.
        if (!currentUserId) {
            setLoading(false);
            setError("로그인된 사용자 정보가 없습니다.");
            return;
        }

        const fetchMyComments = async () => {
            try {
                // 'comments' 컬렉션에서 authorId가 currentUserId와 일치하는 문서들을 조회합니다.
                const q = query(
                    collection(db, "comments"),
                    where("authorId", "==", currentUserId)
                );
                // 추가로, 최신 댓글부터 보려면 orderby("created_at", "desc") 를 추가할 수 있어요.
                // const q = query(
                //     collection(db, "comments"),
                //     where("authorId", "==", currentUserId),
                //     orderBy("created_at", "desc")
                // );


                const querySnapshot = await getDocs(q);
                const commentsData = querySnapshot.docs.map(doc => ({
                    id: doc.id, // 문서 ID (댓글 고유 ID)
                    ...doc.data() // 문서 필드들 (content, postId, created_at 등)
                }));
                setMyComments(commentsData);
                setError(null);
            } catch (err) {
                console.error("나의 댓글을 불러오는 중 오류 발생:", err);
                setError("댓글을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyComments();
    }, [currentUserId]); // currentUserId가 변경될 때마다 다시 실행

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>내 댓글 불러오는 중... 로딩 중이에요! 😊</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>오류 발생: {error} 😥</div>;
    }

    if (myComments.length === 0) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>아직 작성한 댓글이 없어요! 첫 댓글을 남겨주세요! 😉</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>내가 쓴 댓글들 ✍️</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {myComments.map(comment => (
                    <li key={comment.id} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' }}>
                        <p style={{ margin: '0 0 5px 0', fontSize: '1.1em', fontWeight: 'bold' }}>
                            {comment.content}
                        </p>
                        <p style={{ margin: '0', fontSize: '0.8em', color: '#888' }}>
                            {comment.created_at && comment.created_at.toDate().toLocaleString()} (작성 시간)
                            {comment.postId && ` | 게시글 ID: ${comment.postId}`}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyPage; // 꼭 default export 해야 함



