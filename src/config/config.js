export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost/api/"
    : "https://dodog.org/api/";
