import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import { ThemeContext } from "../../../context/ThemeContext";

const StatisticsComponent = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastUser, setLastUser] = useState({});
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await axios.get("/api/admin/total-users");
        setTotalUsers(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    const fetchLastMonth = async () => {
      try {
        const response = await axios.get("/api/admin/last-month-users");
        setLastMonthUsers(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    const fetchLastUser = async () => {
      try {
        const response = await axios.get("/api/admin/last-user");
        setLastUser(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchTotal();
    fetchLastMonth();
    fetchLastUser();
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2>Статистика пользователей</h2>

      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div>
          <p>
            <strong>Всего зарегистрировано:</strong> {totalUsers}
          </p>
          <p>
            <strong>За последний месяц:</strong> {lastMonthUsers}
          </p>
          <p>
            <strong>Последний пользователь:</strong>
          </p>
          {Object.keys(lastUser).length > 0 && (
            <div
              style={{
                border: "1px solid gray",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <p>ID: {lastUser.id}</p>
              <p>
                Дата регистрации:{" "}
                {lastUser.created
                  ? new Date(lastUser.created).toLocaleString()
                  : ""}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatisticsComponent;
