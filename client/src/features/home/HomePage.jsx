import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MenuBar from "./components/MenuBarComponent";
import CookieConsentComponent from "./components/CookieConsentComponent";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   let isMounted = true;
  //   axios
  //     .get("/api/secure/session", { withCredentials: true })
  //     .then((res) => {
  //       if (isMounted) {
  //         if (res.data.isAuthenticated) {
  //           navigate("/main", { replace: true });
  //         } else {
  //           setLoading(false);
  //         }
  //       }
  //     })
  //     .catch(() => {
  //       if (isMounted) setLoading(false);
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [navigate]);

  // if (loading) return <div>Загрузка...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <MenuBar />
      <h1 className="text-3xl font-bold text-gray-900">Добро пожаловать!</h1>
      <CookieConsentComponent />
    </div>
  );
}
