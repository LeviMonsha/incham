import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import LoginForm from "./components/LoginFormComponent";
import RegisterForm from "./components/RegisterFormComponent";

export default function AuthPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "register" ? "register" : "login";

  useEffect(() => {
    axios
      .get("/api/session", { withCredentials: true })
      .then((res) => {
        if (res.data.authenticated) {
          navigate("/main");
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            mode === "login" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setSearchParams({ mode: "login" })}
        >
          Войти
        </button>
        <button
          className={`px-4 py-2 rounded ${
            mode === "register" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setSearchParams({ mode: "register" })}
        >
          Регистрация
        </button>
      </div>
      {mode === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
