import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from "./layout";
import LockManager from "./pages/LockManager";
import { Provider } from "react-redux";
import { store } from "./store";
import Category from "./pages/Category";
import NoMatch from "./pages/NoMatch";
import Settings from "./pages/Settings";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import BasicDialog from "./components/BasicDialog";

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
        {
          path: "lock-manager/category",
          element: <Category />,
        },
        {
          path: "settings",
          element: <Settings />,
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

    {
      path: "*",
      element: <NoMatch />,
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
