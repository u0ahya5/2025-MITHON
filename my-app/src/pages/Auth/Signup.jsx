import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { UserContext } from "../../context/UserContext";

export default function Signup(){
    const { setUser } = useContext(UserContext)
    const[id, setId] = useState("")
    const[pw, setPw] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSignup = async () => {
    try {
      // 이미 있는 아이디 확인
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setError("이미 사용 중인 아이디입니다.");
        return;
      }

      // 새 계정 생성
      await setDoc(userRef, {
        password: pw,
        likes: 0,
        createdAt: serverTimestamp(),
      });

      setUser({ id, password: pw, likes: 0 });
      alert("회원가입 성공!");
      navigate("/login");
    } catch (err) {
      setError("회원가입 실패: " + err.message);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
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
      <button onClick={handleSignup}>회원가입하기</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}