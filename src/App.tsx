import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { PrivateAccess, PublicAccess } from "./services/authProvider";
import { PageLayout } from "./components/layout/PageLayout";
import DevicesPage from "./pages/DevicesPage";
import UsersPage from "./pages/UsersPage";
import { ThemeProvider } from "@mui/material";
import { themeTemplate } from "./styles/theme";

export const App = () => {
  return (
    <ThemeProvider theme={themeTemplate}>
      <Routes>
        <Route element={<PublicAccess />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<RegisterPage />} />
        </Route>
        <Route element={<PrivateAccess />}>
          <Route element={<PageLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
