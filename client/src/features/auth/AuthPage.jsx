import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./components/LoginFormComponent";
import RegisterForm from "./components/RegisterFormComponent";

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "register" ? "register" : "login";

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
