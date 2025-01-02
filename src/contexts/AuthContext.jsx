
import { createContext, useContext, useEffect, useState } from "react";
import apiClient, { ACCESS_TOKEN_KEY } from "../apis/apiClient.jsx";
import authApi from "../apis/authApi.jsx";

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

          const meResponse = await authApi.me();
          const user = meResponse.data;
          
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
      const loginResponse = await authApi.signin(email, password);
      
      const accessToken = loginResponse.data.accessToken;
 
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      apiClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
      
      const meResponse = await authApi.me();
      const user = meResponse.data;

      if (user.role !== "admin") {
        signout();
        return { error: true, message: "Unauthorized" };
      }

      setAuthState({ authenticated: true, loading: false, user });
      return true;
    } catch (e) {
      console.error("Error signing in:", e);
      return { error: true, message: e.response?.data.message || e.message };
    }
  };

  const signout = async () => {
    try {
      await authApi.signout();
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
      return await authApi.signup(fullname, email, password);
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
