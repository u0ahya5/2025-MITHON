import { useState, useContext } from "react";
import { createPost } from "../../services/postService";
import { UserContext } from "../../context/UserContext";

export default function WritePost() {
  const { user } = useContext(UserContext); // 로그인한 유저 정보
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return alert("고민을 입력해주세요!")
    setLoading(true)
    try {
      await createPost(user.uid, text);
      setText(""); // 작성 후 입력 초기화
      alert("글 작성 완료!")
    } catch (err) {
      console.error(err)
      alert("글 작성 실패")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>위로 받고 싶은 글 작성하기</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="고민을 작성해주세요..."
          rows={6}
        />
        <button type="submit" disabled={loading}>
          {loading ? "작성 중..." : "작성하기"}
        </button>
      </form>
    </div>
  );
}