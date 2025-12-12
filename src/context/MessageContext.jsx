import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const MessageContext = createContext();

export default function MessageProvider({ children }) {
  const location = useLocation();
  const [view, setView] = useState("");
  const [upload, setUpload] = useState("");

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
    <MessageContext.Provider value={{ view, setView, upload, setUpload }}>
      {children}
    </MessageContext.Provider>
  );
}
