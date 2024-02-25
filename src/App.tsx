import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import Login from "./pages/Login";

function App() {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <App />,
    // },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
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
