import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Flashcard from "./Components/Flashcard";
import AdminPage from "./Components/AdminPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Flashcard />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
