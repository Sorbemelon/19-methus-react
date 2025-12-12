import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { MessageContext } from "./context/MessageContext";
import Layout from "./components/Layout";
import Home from "./views/Home";
import User from "./views/User";
import Admin from "./views/Admin";
import Owner from "./views/Owner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div className="mind-h-screen flex justify-conter items-center">
        <h1 className="text-4xl">404 - Page Not Found 🤒</h1>
      </div>
    ),


    children:  [
      {path: "/", element: <Home />},
      {path: "user", element: <User />},
      {path: "admin", element: <Admin />},
      {path: "owner", element: <Owner />}
    ]
  }
]);

export default function App() {
  const [view, setView] = useState("");

  return (
    <MessageContext.Provider value={{ view, setView }}>
      <RouterProvider router={router} />
    </MessageContext.Provider>
  );
}