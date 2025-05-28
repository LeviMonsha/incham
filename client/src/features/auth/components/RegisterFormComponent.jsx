import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as validators from "../../../utils/validators";

export default function RegistrationFormComponent() {
  const [form, setForm] = useState({
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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = null;
    switch (name) {
      case "firstName":
        error = validators.validateName(value);
        break;
      case "lastName":
        error = validators.validateSurname(value);
        break;
      case "email":
        error = validators.validateEmail(value);
        break;
      case "username":
        error = validators.validateLogin(value);
        break;
      case "password":
        error = validators.validatePassword(value);
        break;
      case "confirmPassword":
        error = validators.validateConfirmPassword(form.password, value);
        break;
      case "isAdult":
        error = validators.validateIsAdult(value);
        break;
      case "gender":
        error = validators.validateIsMale(value);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "isAcceptRules") {
      setAcceptRules(checked);
      setErrors((prev) => ({
        ...prev,
        isAcceptRules: checked ? null : "Вы должны принять правила!",
      }));
      return;
    }
    const fieldValue = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: fieldValue }));

    validateField(name, fieldValue);
    console.log("Валидация");

    try {
      const res = await axios.get(`/api/auth/check-${name}`, {
        params: { [name]: value },
      });
      if (res.data) {
        setErrors((prev) => ({
          ...prev,
          [name]: `Пользователь с таким ${
            name === "email" ? "email" : "логином"
          } уже существует`,
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
      console.log("Ошибки:", {
        ...errors,
        [name]: res.data
          ? `Пользователь с таким ${
              name === "email" ? "email" : "логином"
            } уже существует`
          : null,
      });
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      firstName: validators.validateName(form.firstName),
      lastName: validators.validateSurname(form.lastName),
      email: validators.validateEmail(form.email),
      username: validators.validateLogin(form.username),
      password: validators.validatePassword(form.password),
      confirmPassword: validators.validateConfirmPassword(
        form.password,
        form.confirmPassword
      ),
      isAdult: validators.validateIsAdult(form.isAdult),
      gender: validators.validateIsMale(form.gender),
      isAcceptRules: isAcceptRules ? null : "Вы должны принять правила!",
    };
    const filtered = Object.fromEntries(
      Object.entries(newErrors).filter(([_, v]) => v)
    );
    setErrors(filtered);
    if (Object.keys(filtered).length > 0) return;

    try {
      await axios.post("/api/auth/register", {
        ...form,
        isAdult: form.isAdult === "true",
      });
      navigate("/auth");
    } catch (error) {
      if (error.response && error.response.data) setErrors(error.response.data);
    }
    form.password = "";
    form.confirmPassword = "";
  };

  const renderError = (name) =>
    errors[name] && <div className="text-red-600 mt-1">{errors[name]}</div>;

  return (
    <Form.Root
      className="max-w-md mx-auto p-6 bg-white rounded shadow"
      onSubmit={handleSubmit}
    >
      <Form.Field name="firstName" className="mb-4">
        <Form.Label>Имя:</Form.Label>
        <Form.Control asChild>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            autoComplete="off"
            className={`w-full border rounded px-3 py-2 ${
              errors.firstName ? "border-red-500" : ""
            }`}
            required
          />
        </Form.Control>
        {renderError("firstName")}
      </Form.Field>

      <Form.Field name="lastName" className="mb-4">
        <Form.Label>Фамилия:</Form.Label>
        <Form.Control asChild>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            autoComplete="off"
            className={`w-full border rounded px-3 py-2 ${
              errors.lastName ? "border-red-500" : ""
            }`}
            required
          />
        </Form.Control>
        {renderError("lastName")}
      </Form.Field>

      <Form.Field name="username" className="mb-4">
        <Form.Label>Имя пользователя:</Form.Label>
        <Form.Control asChild>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.username ? "border-red-500" : ""
            }`}
            required
          />
        </Form.Control>
        {renderError("username")}
      </Form.Field>

      <Form.Field name="email" className="mb-4">
        <Form.Label>Электронная почта:</Form.Label>
        <Form.Control asChild>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.email ? "border-red-500" : ""
            }`}
            required
          />
        </Form.Control>
        {renderError("email")}
      </Form.Field>

      <Form.Field name="password" className="mb-4">
        <Form.Label>Пароль:</Form.Label>
        <Form.Control asChild>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.password ? "border-red-500" : ""
            }`}
            required
          />
        </Form.Control>
        {renderError("password")}
      </Form.Field>

      <Form.Field name="confirmPassword" className="mb-4">
        <Form.Label>Подтверждение пароля:</Form.Label>
        <Form.Control asChild>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            required
          />
        </Form.Control>
        {renderError("confirmPassword")}
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
        {renderError("isAcceptRules")}
      </Form.Field>

      <Form.Field name="isAdult" className="mb-4">
        <Form.Label>Есть 18 лет:</Form.Label>
        <Form.Control asChild>
          <select
            name="isAdult"
            value={form.isAdult}
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
        {renderError("isAdult")}
      </Form.Field>

      <Form.Field name="gender" className="mb-4">
        <Form.Label>Пол:</Form.Label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <Form.Control asChild>
              <input
                type="radio"
                name="gender"
                value="Мужской"
                checked={form.gender === "Мужской"}
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
                checked={form.gender === "Женский"}
                onChange={handleChange}
                className="mr-2"
                required
              />
            </Form.Control>
            Женский
          </label>
        </div>
        {renderError("gender")}
      </Form.Field>

      <Form.Submit asChild>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-700"
        >
          Зарегистрироваться
        </button>
      </Form.Submit>

      {(errors.general || errors.message) && (
        <div className="mt-4 text-center text-red-600">
          {errors.general || errors.message}
        </div>
      )}
    </Form.Root>
  );
}
