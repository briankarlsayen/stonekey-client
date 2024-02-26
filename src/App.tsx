import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from "./layout";
import LockManager from "./pages/LockManager";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "lock-manager",
          element: <LockManager />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
