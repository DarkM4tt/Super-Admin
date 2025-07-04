import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home";
import theme from "./theme.jsx";
import { store } from "./app/Store.js";
import { Provider } from "react-redux";
import ProtectedRoute from "./components/auth-flow/ProtectedRoute.jsx";
import PublicRoute from "./components/auth-flow/PublicRoute.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { SnackbarProvider } from "./context/snackbarContext.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </SnackbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
