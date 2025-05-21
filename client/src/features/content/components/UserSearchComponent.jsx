import React, { useState, useEffect } from "react";

function UserSearchComponent() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) {
        const response = await fetch("api/admin/users");
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
        setError(null);
        return;
      }

      const response = await fetch("api/admin/find-surname-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lastName: searchTerm }),
      });
      if (!response.ok) throw new Error("Ошибка запроса");
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      setUsers([]);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch("api/admin/users");
        if (!response.ok) throw new Error("Ошибка запроса");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      }
    };
    fetchInitialData();
  }, []);

  return (
    <div>
      <div>Введите фамилию:</div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleSearch}
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid",
        }}
      />
      {error ? (
        <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
          Ошибка: {error}
        </div>
      ) : users.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Пользователи не найдены
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {users.map((user) => (
            <div key={user.id}>
              <h3 style={{ margin: 0 }}>{user.surname}</h3>
              <p style={{ margin: 0 }}>{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserSearchComponent;
