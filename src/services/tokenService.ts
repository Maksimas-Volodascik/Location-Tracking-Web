import { jwtDecode } from "jwt-decode";

export function saveAccessToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

export function clearAccessToken() {
  localStorage.removeItem("accessToken");
}

export function isTokenExpired(): boolean {
  const token = getAccessToken();

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
