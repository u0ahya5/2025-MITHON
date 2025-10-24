import { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import { createReply } from "../../services/replyService";
import { UserContext } from "../../context/UserContext";

export default function RandomPost() {
  const { user } = useContext(UserContext)
  const [post, setPost] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [loading, setLoading] = useState(false)

  // Firestore에서 랜덤 글 가져오기
  const fetchRandomPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"))
    const postsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    if (postsArray.length === 0) return setPost(null)
    const randomPost = postsArray[Math.floor(Math.random() * postsArray.length)]
    setPost(randomPost)
  };

  useEffect(() => {
    fetchRandomPost();
  }, []);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return alert("위로글을 작성해주세요!")
    setLoading(true);
    try {
      await createReply(post.id, user.uid, replyText, post.authorId)
      setReplyText(""); // 작성 후 초기화
      alert("위로글 작성 완료!")
    } catch (err) {
      console.error(err);
      alert("위로글 작성 실패")
    } finally {
      setLoading(false)
    }
  };

  if (!post) return <p>표시할 글이 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>고민을 듣고 위로를 해주세요</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        <p><strong>{post.authorNickname}</strong>님: {post.text}</p>
      </div>
      <form onSubmit={handleReply}>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="위로글을 작성해주세요..."
          rows={4}
          style={{ width: "100%", fontSize: "16px" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "작성 중..." : "답글 작성"}
        </button>
      </form>
      <button onClick={fetchRandomPost}>
        다음 랜덤 글 보기
      </button>
    </div>
  );
}