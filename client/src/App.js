import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RegisterPage from "./features/auth/AuthPage";
import HomePage from "./features/home/HomePage";

import "./styles/App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/auth" element={<RegisterPage />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
