import { Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/layout/PageLayout";
import { ThemeProvider } from "@mui/material";
import { themeTemplate } from "./styles/theme";
import { UsersPage } from "./pages/UsersPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DevicesPage } from "./pages/DevicesPage";
import { PublicAccess } from "./routes/PublicAccess";
import { PrivateAccess } from "./routes/PrivateAccess";
import { RequirePermission } from "./routes/RequirePermission";

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

            <Route element={<RequirePermission permission="view:devices" />}>
              <Route path="/devices" element={<DevicesPage />} />
            </Route>

            <Route element={<RequirePermission permission="view:users" />}>
              <Route path="/users" element={<UsersPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
