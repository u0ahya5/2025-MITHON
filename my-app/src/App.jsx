import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Alarm from "./pages/Home/Alarm";
import MyPage from "./pages/Mypage/MyPage";
import Login from "./pages/Auth/Login"
import Signup from "./pages/Auth/Signup";
import AuthWrapper from "./pages/Auth/AuthWrapper";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
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
      </Router>
    </UserProvider>
  );
}

export default App;
