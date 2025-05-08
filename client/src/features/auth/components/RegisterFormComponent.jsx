import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";

export default function RegistrationForm() {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAcceptRules: false,
    isAdult: "",
    gender: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.isAcceptRules) {
      setMessage("Вы должны принять правила!");
      return;
    }
    setMessage("Успешно!");
  };

  return (
    <Form.Root
      className="max-w-md mx-auto p-6 bg-white rounded shadow"
      onSubmit={handleSubmit}
    >
      <Form.Field name="firstName" className="mb-4">
        <Form.Label className="block mb-1">Имя:</Form.Label>
        <Form.Control asChild>
          <input
            type="text"
            name="firstName"
            placeholder="Иван"
            value={registerForm.firstName}
            onChange={handleChange}
            autoComplete="off"
            className="w-full border rounded px-3 py-2"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="lastName" className="mb-4">
        <Form.Label className="block mb-1">Фамилия:</Form.Label>
        <Form.Control asChild>
          <input
            type="text"
            name="lastName"
            placeholder="Иванов"
            value={registerForm.lastName}
            onChange={handleChange}
            autoComplete="off"
            className="w-full border rounded px-3 py-2"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="username" className="mb-4">
        <Form.Label className="block mb-1">Имя пользователя:</Form.Label>
        <Form.Control asChild>
          <input
            type="text"
            name="username"
            placeholder="Ivan"
            value={registerForm.username}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="email" className="mb-4">
        <Form.Label className="block mb-1">Электронная почта:</Form.Label>
        <Form.Control asChild>
          <input
            type="email"
            name="email"
            placeholder="ivan@email.com"
            value={registerForm.email}
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
            placeholder="Pass!word123"
            value={registerForm.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="confirmPassword" className="mb-4">
        <Form.Label className="block mb-1">Подтверждение пароля:</Form.Label>
        <Form.Control asChild>
          <input
            type="password"
            name="confirmPassword"
            value={registerForm.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
            className="w-full border rounded px-3 py-2"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="isAcceptRules" className="mb-4">
        <Form.Label className="flex items-center">
          <Form.Control asChild>
            <input
              type="checkbox"
              name="isAcceptRules"
              checked={registerForm.isAcceptRules}
              onChange={handleChange}
              className="mr-2"
            />
          </Form.Control>
          Принимаю правила...
        </Form.Label>
      </Form.Field>

      <Form.Field name="isAdult" className="mb-4">
        <Form.Label className="block mb-1">Есть 18 лет:</Form.Label>
        <Form.Control asChild>
          <select
            name="isAdult"
            value={registerForm.isAdult}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">выберите</option>
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </select>
        </Form.Control>
      </Form.Field>

      <Form.Field name="gender" className="mb-4">
        <Form.Label className="block mb-1">Пол:</Form.Label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <Form.Control asChild>
              <input
                type="radio"
                name="gender"
                value="Мужской"
                checked={registerForm.gender === "Мужской"}
                onChange={handleChange}
                className="mr-2"
              />
            </Form.Control>
            Мужской
          </label>
          <label className="flex items-center">
            <Form.Control asChild>
              <input
                type="radio"
                name="gender"
                value="Женский"
                checked={registerForm.gender === "Женский"}
                onChange={handleChange}
                className="mr-2"
              />
            </Form.Control>
            Женский
          </label>
        </div>
      </Form.Field>

      <Form.Submit asChild>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-700"
        >
          Зарегистрироваться
        </button>
      </Form.Submit>

      {message && (
        <div className="mt-4 text-center text-red-600">{message}</div>
      )}
    </Form.Root>
  );
}
