import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login.tsx";
import Layout from "./common/ui/layout.tsx";
import UserForm from "./pages/user/user-form.tsx";
import Dashboard from "./pages/dashboard/index.tsx";
import RegisterPage from "./pages/register/register.tsx";
import AdminDashboard from "./pages/dashboard/admin-dashborad.tsx";
import NotificationsPage from "./pages/notification/index.tsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />

        <Route path={"/"} element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="user" element={<UserForm />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="notification" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
