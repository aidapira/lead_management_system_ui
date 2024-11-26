export const getAuthToken = () => localStorage.getItem("authToken");

export const clearAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  // Optionally: Validate the token's structure or expiry
  return !!token;
};
