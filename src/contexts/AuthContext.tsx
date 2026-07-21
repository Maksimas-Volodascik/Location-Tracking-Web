import { createContext, useContext, useMemo, useState } from "react";
import type { LoginProps } from "../types/shared";
import { userLogin } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import {
  clearAccessToken,
  getAccessToken,
  getRole,
  saveAccessToken,
} from "../services/authToken";
import {
  Role_Permissions,
  type Permissions,
  type Role,
} from "../types/permissions";

type AuthProps = {
  token: string | null;
  role: Role | null;
  loginAction: (data: LoginProps) => void;
  logoutAction: () => void;
  can: (p: Permissions) => boolean;
};

const AuthContext = createContext<AuthProps>({
  token: null,
  role: null,
  loginAction: () => {},
  logoutAction: () => {},
  can: () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(getAccessToken() || null);
  const [role, setRole] = useState<Role | null>(getRole() || null);

  const loginAction = async (data: LoginProps) => {
    const response = await userLogin(data);
    setToken(response);
    saveAccessToken(response);
    setRole(getRole(response));
    navigate("/dashboard");
  };

  const logoutAction = () => {
    setToken(null);
    setRole(null);
    clearAccessToken();
    navigate("/login");
  };

  const userPerm = useMemo<{
    role: Role | null;
    can: (p: Permissions) => boolean;
  }>(() => {
    const perms = new Set(role ? (Role_Permissions[role] ?? []) : []);
    return { role, can: (p) => perms.has(p) };
  }, [role]);

  return (
    <AuthContext.Provider
      value={{ token, ...userPerm, loginAction, logoutAction }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
