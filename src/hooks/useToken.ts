import { parseCookies, setCookie } from "nookies";
import { useState } from "react";

const TOKEN = "@token";

const useToken = (): [string, (token: string) => void] => {
  const [token, setToken] = useState(parseCookies()[TOKEN] || "");

  const _setToken = (token: string) => {
    setToken(token);
    setCookie(null, TOKEN, token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  };

  return [token, setToken];
};

export { useToken };
