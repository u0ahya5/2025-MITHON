// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Alarm from "./pages/Home/Alarm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alarm" element={<Alarm />} />
      </Routes>
    </Router>
  );
}

export default App;