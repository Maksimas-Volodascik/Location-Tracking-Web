import { baseURL } from "./apiConfig";
import { getAccessToken } from "./authToken";

async function request<Type>(
  path: string,
  options: RequestInit = {},
): Promise<Type> {
  const accessToken = getAccessToken();

  const response = await fetch(`${baseURL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<Type>;
}

export function getRequest<Type>(path: string): Promise<Type> {
  return request<Type>(path, { method: "GET" });
}

export function postRequest<Type, Body = unknown>(
  path: string,
  body: Body,
): Promise<Type> {
  return request<Type>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function patchRequest<Type, Body = unknown>(
  path: string,
  body: Body,
): Promise<Type> {
  return request<Type>(path, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function deleteRequest<Type>(path: string): Promise<Type> {
  return request<Type>(path, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}
