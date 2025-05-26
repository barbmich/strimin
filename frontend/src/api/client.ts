import ky from "ky";

export const httpClient = ky.create({
  prefixUrl: "http://localhost:3000/api",
  timeout: 3000,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
