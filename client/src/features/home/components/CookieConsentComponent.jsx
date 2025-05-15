import React, { useState, useEffect } from "react";

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export default function CookieConsentComponent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie("user_cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie("user_cookie_consent", "true", 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex justify-between items-center z-50">
      <span className="text-sm">
        Мы используем cookie для улучшения вашего опыта. Продолжая пользоваться
        сайтом, вы соглашаетесь с нашей политикой cookie.
      </span>
      <button
        onClick={acceptCookies}
        className="ml-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors duration-200"
      >
        Принять
      </button>
    </div>
  );
}
