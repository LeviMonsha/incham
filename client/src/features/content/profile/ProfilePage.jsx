import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { ThemeContext } from "../../../context/ThemeContext";

import MenuBar from "../components/MenuBarComponent";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const { theme, handleThemeChange } = useContext(ThemeContext);

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/profile", {
        withCredentials: true,
      });
      setProfileData(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setProfileData(null);
      console.error("Ошибка при загрузке профиля:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const response = await axios.post("/api/user/logout", null, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(false);
        setProfileData(null);
      } else {
        console.error("Ошибка при выходе:", response.status);
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  return (
    <div>
      <MenuBar />
      <div
        className={`min-h-screen py-8 px-4 ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="max-w-md mx-auto rounded-lg shadow-lg p-6 bg-opacity-80">
          {loading ? (
            <div className="text-center text-lg font-medium">Загрузка...</div>
          ) : isAuthenticated && profileData ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Профиль пользователя</h2>
              <ul className="mb-6 space-y-1">
                <li>
                  <span className="font-semibold">Логин:</span>{" "}
                  {profileData.username}
                </li>
                <li>
                  <span className="font-semibold">Имя:</span>{" "}
                  {profileData.firstName}
                </li>
                <li>
                  <span className="font-semibold">Фамилия:</span>{" "}
                  {profileData.lastName}
                </li>
                <li>
                  <span className="font-semibold">Email:</span>{" "}
                  {profileData.email}
                </li>
                <li>
                  <span className="font-semibold">Пол:</span>{" "}
                  {profileData.gender ? "Мужской" : "Женский"}
                </li>
                <li>
                  <span className="font-semibold">Взрослый:</span>{" "}
                  {profileData.isAdult ? "Да" : "Нет"}
                </li>
              </ul>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition mb-4"
              >
                Выйти из системы
              </button>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Войдите в систему</h2>
              <p className="text-gray-500 dark:text-gray-300">
                Для просмотра профиля необходимо авторизоваться.
              </p>
            </div>
          )}
          <button
            onClick={handleThemeChange}
            className="w-full py-2 px-4 mt-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
          >
            Переключить тему на {theme === "light" ? "тёмную" : "светлую"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
