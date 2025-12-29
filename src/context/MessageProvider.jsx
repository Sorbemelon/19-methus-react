import { MessageContext } from "./MessageContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MessageProvider({ children }) {
  const API = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const [view, setView] = useState("");
  const [update, setUpdate] = useState("");

  useEffect(() => {
    if (location.pathname === "/user") {
      setView("user");
    } else if (location.pathname === "/admin") {
      setView("admin");
    } else {
      setView("");
    }
  }, [location.pathname]);

  return (
    <MessageContext.Provider value={{ view, setView, update, setUpdate, API }}>
      {children}
    </MessageContext.Provider>
  );
}
