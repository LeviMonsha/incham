import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MenuBar from "./components/MenuBarComponent";
import CookieConsentComponent from "./components/CookieConsentComponent";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <MenuBar />
      <h1 className="text-3xl font-bold text-gray-900">Добро пожаловать!</h1>
      <CookieConsentComponent />
    </div>
  );
}
