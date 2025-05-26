import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import "@radix-ui/themes/styles.css";

import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import AuthPage from "./features/auth/AuthPage";
import HomePage from "./features/home/HomePage";
import MainPage from "./features/content/MainPage";
import ProfilePage from "./features/content/profile/ProfilePage";
import SettingsPage from "./features/content/settings/SettingsPage";
import AdminPage from "./features/admin/AdminPage";

import "./styles/App.css";

// function PrivateRoute({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     axios
//       .get("/api/secure/session", { withCredentials: true })
//       .then((res) => setIsAuthenticated(res.data.authenticated))
//       .catch(() => setIsAuthenticated(false));
//   }, []);
//   if (isAuthenticated === null) return <div>Загрузка...</div>;
//   if (!isAuthenticated) return <Navigate to="/auth" replace />;
//   return children;
// }

const AppContainer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <Routes>
        <Route exact path="/auth" element={<AuthPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route
          path="/main"
          element={
            // <PrivateRoute>
            <MainPage />
            // </PrivateRoute>
          }
        />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/settings" element={<SettingsPage />} />
        <Route exact path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContainer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
