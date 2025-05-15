import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginFormComponent() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      setMessage("Пожалуйста, заполните все поля");
      return;
    }

    if (!captchaValue) {
      setMessage("Пожалуйста, подтвердите, что вы не робот");
      return;
    }

    try {
      await axios.post("/api/secure/captcha", { recaptchaToken: captchaValue });
      navigate("/main");
    } catch (error) {
      setMessage(
        error.response?.data || "Ошибка проверки капчи. Попробуйте ещё раз."
      );
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setCaptchaValue(null);
    }
  };

  return (
    <Form.Root
      className="max-w-md mx-auto p-6 bg-white rounded shadow"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>

      <Form.Field name="email" className="mb-4">
        <Form.Label className="block mb-1">Электронная почта:</Form.Label>
        <Form.Control asChild>
          <input
            type="email"
            name="email"
            placeholder="ivan@email.com"
            value={loginForm.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="password" className="mb-4">
        <Form.Label className="block mb-1">Пароль:</Form.Label>
        <Form.Control asChild>
          <input
            type="password"
            name="password"
            placeholder="Ваш пароль"
            value={loginForm.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </Form.Control>
      </Form.Field>

      <div className="mb-4 flex justify-center">
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_CAPTCHA_API_KEY}
          onChange={handleCaptchaChange}
          ref={recaptchaRef}
        />
      </div>

      <Form.Submit asChild>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-700"
          disabled={!captchaValue}
        >
          Войти
        </button>
      </Form.Submit>

      {message && (
        <div className="mt-4 text-center text-red-600">{message}</div>
      )}
    </Form.Root>
  );
}
