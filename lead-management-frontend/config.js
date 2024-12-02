const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://lead-management-system-service.onrender.com/"
    : "http://localhost:5001";

export default API_BASE_URL;