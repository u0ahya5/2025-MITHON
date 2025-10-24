import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";

export default function Login(){
    const[id, setId] = useState("")
    const[pw, setPw] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async () => {
        const auth = getAuth(app)
        try {
            await signInWithEmailAndPassword(auth, id, pw)
            alert("로그인 성공!")
            // 로그인 후 상태 변경
            } catch (err) {
            setError("로그인 실패: " + err.message)
            }
        };
        
    return(
        <div>
            <input
                type="email"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디를 입력하세요"
            />
            <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                />
             <button onClick={handleLogin}>로그인하기</button>
             {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}