import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";

export default function LoginFormComponent() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setMessage("Пожалуйста, заполните все поля.");
      return;
    }
    setMessage("Успешно!");
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

      <Form.Submit asChild>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-700"
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
