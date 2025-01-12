import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import LoginForm from "../components/Auth/LoginForm";
import "./LoginPage.css";
import { saveToken } from "../utils/authUtils";
import api from "../utils/api";
import { toast } from "react-toastify";

interface LoginPageProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated, setIsAdmin }) => {
  const navigate = useNavigate();
  const [rememberedEmail, setRememberedEmail] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) setRememberedEmail(storedEmail);
  }, []);

  const validateLogin = (email: string, password: string) => {
    console.log(email, password);

    const { error } = loginSchema.validate({ email, password }, { abortEarly: true });
    console.log(error);
    if (error) {
      const validationErrors = error.details.reduce((acc: Record<string, string>, curr) => {
        acc[curr.context?.key || ""] = curr.message;
        return acc;
      }, {});
      setErrors(validationErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const loginRequest = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      saveToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      setIsAdmin(user.role === "admin");

      navigate("/home");
      toast.success("Login successful!");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred during login.";
      console.error("Login error:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleLogin = (email: string, password: string, rememberMe: boolean) => {
    if (!validateLogin(email, password)) {
      toast.error("Validation failed. Please check your inputs.");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    loginRequest(email, password);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <LoginForm
          onSubmit={handleLogin}
          rememberedEmail={rememberedEmail}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        {errors.password && <p className="error-message">{errors.password}</p>}
        <div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
