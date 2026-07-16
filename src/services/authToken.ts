import { jwtDecode, type JwtPayload } from "jwt-decode";
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

export function getRole() {
  const token = getAccessToken();
  if (!token || token === "Invalid credentials.") {
    return null; // no token found
  }

  const decodedJwt = jwtDecode<jwtPayload>(token);

  if (!decodedJwt) return null;
  return decodedJwt[roleURI];
}
