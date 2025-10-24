import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { UserContext } from "../../context/UserContext";

export default function Login() {
    const { setUser } = useContext(UserContext);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError("존재하지 않는 아이디입니다.");
        return;
      }

      const data = userSnap.data();
      if (data.password === pw) {
        setUser({ id, ...data })
        alert("로그인 성공!");
        navigate("/"); // 로그인 후 홈 페이지 이동
      } else {
        setError("비밀번호가 틀렸습니다.");
      }
    } catch (err) {
      setError("로그인 실패: " + err.message);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디"
      />
      <input
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="비밀번호"
      />
      <button onClick={handleLogin}>로그인하기</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}