import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { UserContext } from "../../context/UserContext";

export default function Signup() {
  const { setUser } = useContext(UserContext);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [checkMessage, setCheckMessage] = useState("");
  const navigate = useNavigate();

  // 🔍 아이디 중복확인
  const handleCheckId = async () => {
    if (!id.trim()) {
      setCheckMessage("아이디를 입력해주세요.");
      return;
    }

    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setCheckMessage("이미 사용 중인 아이디입니다.");
    } else {
      setCheckMessage("사용 가능한 아이디입니다!");
    }
  };

  // 🧡 회원가입 처리
  const handleSignup = async () => {
    try {
      if (!id.trim() || !pw.trim()) {
        setError("아이디와 비밀번호를 입력해주세요.");
        return;
      }

      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setError("이미 존재하는 아이디입니다.");
        return;
      }

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
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #ff7f73;
          font-family: 'Noto Sans KR', sans-serif;
        }
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 1500px;
        }
        .signup-box {
          background-color: #fff;
          border-radius: 12px;
          padding: 40px 50px;
          width: 360px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .signup-box h2 {
          font-size: 30px;
          font-weight: 700;
          color: #ff6659;
          margin-bottom: 5px;
        }
        .signup-box p {
          font-size: 13px;
          color: #888;
          margin-bottom: 25px;
        }
        .input-group {
          text-align: left;
          margin-bottom: 16px;
        }
        .input-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #444;
          margin-bottom: 6px;
        }
        .id-check {
          display: flex;
          gap: 6px;
        }
        .id-check input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
        }
        .check-btn {
          background-color: #ff6659;
          color: #fff;
          border: none;
          padding: 10px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: 0.2s;
        }
        .check-btn:hover {
          background-color: #ff4c3b;
        }
        .input-group input[type="password"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
        }
        .input-group input:focus {
          border-color: #ff6659;
        }
        .signup-btn {
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
        .signup-btn:hover {
          background-color: #ff4c3b;
        }
        .error {
          color: red;
          font-size: 13px;
          margin-top: 8px;
        }
        .check-message {
          font-size: 12px;
          margin-top: 5px;
          color: #666;
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

      <div className="signup-container">
        <div className="signup-box">
          <h2>어울림</h2>
          <p>당신의 위로가 나의 이야기가 된다.</p>

          <div className="input-group">
            <label>ID</label>
            <div className="id-check">
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디를 입력해주세요"
              />
              <button className="check-btn" onClick={handleCheckId}>
                중복확인
              </button>
            </div>
            {checkMessage && <p className="check-message">{checkMessage}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>

          <button className="signup-btn" onClick={handleSignup}>
            회원가입
          </button>

          {error && <p className="error">{error}</p>}

          <div className="bottom-links">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("./Login.jsx")}
            >
              로그인
            </span>
            <span>|</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/find-id")}
            >
              아이디 찾기
            </span>
            <span>|</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/find-pw")}
            >
              비밀번호 찾기
            </span>
          </div>

        </div>
      </div>
    </>
  );
}