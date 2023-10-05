import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  registerRequestEmployee
} from "../../../request/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isEmployee, setisEmployee] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setisAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const signupEmp = async (user) => {
    try {
      const res = await registerRequestEmployee(user);
      alert(res.data.message)
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setisAuthenticated(true);
      if (res.data.role === "admin") {
        setisEmployee(true);
        setisAdmin(true);
      } else if (res.data.role === "employee") {
        setisEmployee(true);
        setisAdmin(false);
      } else {
        setisEmployee(false);
        setisAdmin(false);
      };
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setisAuthenticated(false);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setisAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setisAuthenticated(false);
        setisAuthenticated(true);
        setUser(res.data);
        setLoading(false);
        if (res.data.role === "admin") {
          setisEmployee(true);
          setisAdmin(true);
        } else if (res.data.role === "employee") {
          setisEmployee(true);
          setisAdmin(false);
        } else {
          setisEmployee(false);
          setisAdmin(false);
        };
      } catch (error) {
        setisAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signupEmp,
        signin,
        logout,
        user,
        isAuthenticated,
        isEmployee,
        isAdmin,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
