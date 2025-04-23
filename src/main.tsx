import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login.tsx";
import Layout from "./common/ui/layout.tsx";
import UserForm from "./pages/user/user-form.tsx";
import Dashboard from "./pages/dashboard/index.tsx";
import RegisterPage from "./pages/register/register.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />

        <Route path={"/"} element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="user" element={<UserForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
