import { jwtDecode, type JwtPayload } from "jwt-decode";
import { Roles, type Role } from "../types/permissions";
const roleURI = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

interface jwtPayload extends JwtPayload {
  sub: string;
  name: string;
  email: string;
  [roleURI]: string;
  exp: number;
  iss: string;
  aud: string;
}

export function saveAccessToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

export function getAccessToken(): string | undefined {
  return localStorage.getItem("accessToken")?.split(" ")[1];
}

export function clearAccessToken() {
  localStorage.removeItem("accessToken");
}

export function isTokenExpired(): boolean {
  const token = localStorage.getItem("accessToken");
  const now = Date.now() / 1000;

  if (!token || token === "Invalid credentials.") {
    return true; // no token found
  }

  const decodedJwt = jwtDecode<jwtPayload>(token);

  if (!decodedJwt.exp) {
    return true; // missing expiration date
  }

  return decodedJwt.exp < now;
}

function isRole(value: unknown): value is Role {
  return (
    typeof value === "string" && (Roles as readonly string[]).includes(value)
  );
}

export function getRole(): Role | null {
  const token = getAccessToken();
  if (!token || token === "Invalid credentials.") {
    return null; // no token found
  }

  let decodedJwt: jwtPayload;
  try {
    decodedJwt = jwtDecode<jwtPayload>(token);
  } catch {
    return null; // malformed token
  }

  const role = decodedJwt[roleURI];
  return isRole(role) ? role : null;
}
