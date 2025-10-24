import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Alarm from "./pages/Home/Alarm";
import MyPage from "./pages/Mypage/MyPage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AuthWrapper from "./pages/Auth/AuthWrapper";
import { UserProvider, UserContext } from "./context/UserContext";

function AppRoutes() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const signedUp = localStorage.getItem("signedUp"); // 회원가입 여부 체크용
      if (!signedUp) {
        navigate("/signup");
      } else {
        navigate("/login");
      }
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <AuthWrapper>
            <Home />
          </AuthWrapper>
        }
      />
      <Route
        path="/alarm"
        element={
          <AuthWrapper>
            <Alarm />
          </AuthWrapper>
        }
      />
      <Route
        path="/mypage"
        element={
          <AuthWrapper>
            <MyPage />
          </AuthWrapper>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;