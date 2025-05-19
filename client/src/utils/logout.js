import API from "./axios";

export const handleLogout = async (navigate, setUser) => {
  try {
    await API.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
