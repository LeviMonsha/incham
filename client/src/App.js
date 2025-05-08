import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import "@radix-ui/themes/styles.css";

import AuthPage from "./features/auth/AuthPage";
import HomePage from "./features/home/HomePage";
import MainPage from "./features/content/MainPage";

import "./styles/App.css";

function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get("/api/session", { withCredentials: true })
      .then((res) => setIsAuthenticated(res.data.authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);
  if (isAuthenticated === null) return <div>Загрузка...</div>;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return children;
}

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/auth" element={<AuthPage />} />
          <Route exact path="/" element={<HomePage />} />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
