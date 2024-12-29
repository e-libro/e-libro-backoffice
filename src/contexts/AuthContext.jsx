import { createContext, useContext, useEffect, useState } from "react";
import apiClient, { ACCESS_TOKEN_KEY } from "../apis/apiClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    authenticated: false,
    loading: true,
    user: null,
  });

  useEffect(() => {
    const loadToken = async  () => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        try {
          const response = await apiClient.get("/auth/me"); 
          const user = response.data;

          apiClient.defaults.headers.Authorization = `Bearer ${token}`;
          setAuthState({ authenticated: true, loading: false, user });
        } catch (e) {
          console.error("Error al cargar los datos del usuario:", e);
          setAuthState({ authenticated: false, loading: false, user: null });
        }
      } else {
        setAuthState({ authenticated: false, loading: false, user: null });
      }
    };

    loadToken();
  }, []);

  const signin = async (email, password) => {
    try {
      const response = await apiClient.post("/auth/signin", { email, password });
      const accessToken = response.data.accessToken;

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      apiClient.defaults.headers.Authorization = `Bearer ${accessToken}`;

      const meResponse = await apiClient.get("/auth/me");
      const user = meResponse.data;

      setAuthState({ authenticated: true, loading: false, user });
      return response;
    } catch (e) {
      console.error("Error signing in:", e);
      return { error: true, message: e.response?.data.message || e.message };
    }
  };

  const signout = async () => {
    try {
      await apiClient.post("/auth/signout", {}, { withCredentials: true });
    } catch (e) {
      console.error("Error signing out:", e);
    } finally {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      delete apiClient.defaults.headers.Authorization;
      setAuthState({ authenticated: false, loading: false });
    }
  };

  const signup = async (fullname, email, password) => {
    try {
      return await apiClient.post("/auth/signup", { fullname, email, password });
    } catch (e) {
      console.error("Error signing up:", e);
      return { error: true, message: e.response?.data.message };
    }
  };

  return (
    <AuthContext.Provider value={{ signin, signout, signup, authState }}>
      {children}
    </AuthContext.Provider>
  );
};
