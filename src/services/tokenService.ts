import { jwtDecode } from "jwt-decode";

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

  if (!token) {
    return true; // no token found
  }

  const decodedJwt = jwtDecode<{ exp?: number }>(token);

  if (!decodedJwt.exp) {
    return true; // missing expiration date
  }
  const now = Date.now() / 1000;

  return decodedJwt.exp < now;
}
