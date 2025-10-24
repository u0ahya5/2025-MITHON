import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, app } from "./firebase";

export default function Signup(){
    const[id, setId] = useState("")
    const[pw, setPw] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSignup = async () => {
        const auth = getAuth(app);
        try {
        // Firebase Auth 회원가입
        const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
        const uid = userCredential.user.uid;

        // Firestore users 컬렉션에 추가
        await setDoc(doc(db, "users", uid), {
            email,
            createdAt: serverTimestamp(),
        });

        alert("회원가입 성공!");
        navigate("/login"); // 가입 후 로그인 페이지로 이동
        } catch (err) {
        setError("회원가입 실패: " + err.message);
        }
    };

  return (
    <div>
      <h2>회원가입</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="아이디(이메일)"
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