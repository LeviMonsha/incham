import React, { useState, useRef } from "react";
import * as Form from "@radix-ui/react-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegistrationFormComponent() {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdult: "",
    gender: "",
    isDarkTheme: false,
  });

  const [isAcceptRules, setAcceptRules] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const debounceRef = useRef({});

  const validateFieldServer = (name, value) => {
    if (debounceRef.current[name]) clearTimeout(debounceRef.current[name]);
    debounceRef.current[name] = setTimeout(async () => {
      try {
        await axios.post("/api/auth/validate-field", { [name]: value });
        setErrors((prev) => ({ ...prev, [name]: null }));
      } catch (err) {
        if (err.response && err.response.data) {
          setErrors((prev) => ({ ...prev, ...err.response.data }));
        }
      }
    }, 400);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "isAcceptRules") {
      setAcceptRules(checked);
    } else {
      const fieldValue = type === "checkbox" ? checked : value;
      setRegisterForm((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));
      validateFieldServer(name, fieldValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAcceptRules) {
      setMessage("Вы должны принять правила!");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Пароли не совпадают!",
      }));
      setMessage("Пароли не совпадают!");
      return;
    }

    const userData = {
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      isAdult: registerForm.isAdult === "true",
      gender: registerForm.gender,
      isDarkTheme: registerForm.isDarkTheme,
    };

    try {
      const response = await axios.post("/api/auth/register", userData);
      setErrors({});
      setMessage(response.data.message);
      navigate("/auth");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        setMessage("");
      } else {
        setMessage("Ошибка при регистрации");
      }
    }
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
            className={`w-full border rounded px-3 py-2 ${
              errors.firstName ? "border-red-500" : ""
            }`}
            required
          />
        </Form.Control>
        {errors.firstName && (
          <div className="text-red-600 mt-1">{errors.firstName}</div>
        )}
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
            className={`w-full border rounded px-3 py-2 ${
              errors.lastName ? "border-red-500" : ""
            }`}
            required
          />
        </Form.Control>
        {errors.lastName && (
          <div className="text-red-600 mt-1">{errors.lastName}</div>
        )}
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
            className={`w-full border rounded px-3 py-2 ${
              errors.username ? "border-red-500" : ""
            }`}
          />
        </Form.Control>
        {errors.username && (
          <div className="text-red-600 mt-1">{errors.username}</div>
        )}
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
            className={`w-full border rounded px-3 py-2 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
        </Form.Control>
        {errors.email && (
          <div className="text-red-600 mt-1">{errors.email}</div>
        )}
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
            className={`w-full border rounded px-3 py-2 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
        </Form.Control>
        {errors.password && (
          <div className="text-red-600 mt-1">{errors.password}</div>
        )}
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
            className={`w-full border rounded px-3 py-2 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
        </Form.Control>
        {errors.confirmPassword && (
          <div className="text-red-600 mt-1">{errors.confirmPassword}</div>
        )}
      </Form.Field>

      <Form.Field name="isAcceptRules" className="mb-4">
        <Form.Label className="flex items-center">
          <Form.Control asChild>
            <input
              type="checkbox"
              name="isAcceptRules"
              checked={isAcceptRules}
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
            className={`w-full border rounded px-3 py-2 ${
              errors.isAdult ? "border-red-500" : ""
            }`}
            required
          >
            <option value="">выберите</option>
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </select>
        </Form.Control>
        {errors.isAdult && (
          <div className="text-red-600 mt-1">{errors.isAdult}</div>
        )}
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
                required
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
                required
              />
            </Form.Control>
            Женский
          </label>
        </div>
        {errors.gender && (
          <div className="text-red-600 mt-1">{errors.gender}</div>
        )}
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
