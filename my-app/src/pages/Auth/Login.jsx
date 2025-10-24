import React, { useState, useContext } from "react";
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
      if (!id.trim() || !pw.trim()) {
        setError("아이디와 비밀번호를 입력해주세요.");
        return;
      }

      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError("존재하지 않는 아이디입니다.");
        return;
      }

      const data = userSnap.data();
      if (data.password === pw) {
        setUser({ id, ...data });
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
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #ff7f73;
          font-family: 'Noto Sans KR', sans-serif;
        }
        .login-container-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 1500px;
        }
        .login-box {
          background-color: #fff;
          border-radius: 12px;
          padding: 40px 50px;
          width: 360px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .login-box h2 {
          font-size: 30px;
          font-weight: 700;
          color: #ff6659;
          margin-bottom: 5px;
        }
        .login-box p {
          font-size: 13px;
          color: #888;
          margin-bottom: 25px;
        }
        .login-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          margin-bottom: 16px;
          outline: none;
          box-sizing: border-box;
        }

        .login-input:focus {
          border-color: #ff6659;
        }
        .login-button {
          width: 100%;
          padding: 12px;
          background-color: #ff6659;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.2s;
        }
        .login-button:hover {
          background-color: #ff4c3b;
        }
        .login-error {
          color: red;
          font-size: 13px;
          margin-top: 8px;
        }
        .bottom-links {
          margin-top: 15px;
          font-size: 12px;
          color: #777;
        }
        .bottom-links a {
          color: #777;
          text-decoration: none;
          transition: 0.2s;
        }
        .bottom-links a:hover {
          color: #ff6659;
        }
        .bottom-links span {
          margin: 0 6px;
          color: #ccc;
        }
      `}</style>

      <div className="login-container-wrapper">
        <div className="login-box">
          <h2>어울림</h2>
          <p>당신의 위로가 나의 이유가 된다.</p>

          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
            className="login-input"
          />
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호"
            className="login-input"
          />

          <button className="login-button" onClick={handleLogin}>
            로그인
          </button>

          {error && <p className="login-error">{error}</p>}

          <div className="bottom-links">
            <a href="/signup">회원가입</a>
            <span>|</span>
            <a href="/find-id">아이디 찾기</a>
            <span>|</span>
            <a href="/find-pw">비밀번호 찾기</a>
          </div>
        </div>
      </div>
    </>
  );
}