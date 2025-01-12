import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import RegisterForm from "../components/Auth/RegisterForm";
import "./LoginPage.css";
import api from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Joi Schema
export const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
  }),
  password: Joi.string()
      .min(8)
      .required()
      .pattern(/(?=.*[A-Z])/, 'uppercase')
      .pattern(/(?=.*[a-z])/, 'lowercase')
      .pattern(/(?=.*\d)/, 'number')
      .pattern(/(?=.*[@$!%*?&])/, 'special character')
      .messages({
          "string.min": "Password must be at least 8 characters",
          "string.pattern.uppercase": "Password must contain at least one uppercase letter",
          "string.pattern.lowercase": "Password must contain at least one lowercase letter",
          "string.pattern.number": "Password must contain at least one number",
          "string.pattern.special": "Password must contain at least one special character",
          "any.required": "Password is required",
      }),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRegister = async (email: string, password: string) => {
    const { error } = registerSchema.validate({ email, password }, { abortEarly: true });

    if (error) {
      const errorMessages = error.details.reduce((acc: Record<string, string>, curr) => {
        acc[curr.context?.key || ""] = curr.message;
        return acc;
      }, {});
      setErrors(errorMessages);
      toast.error("Validation failed. Please check the form.");
      return;
    }

    setErrors({}); // Clear previous errors

    try {
      await api.post("/auth/register", { email, password });
      toast.success("Registration successful. Please log in.");
      navigate("/login");
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        console.error("Error during registration:", err.response.data.message);
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("An error occurred during registration.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Register</h1>
        <RegisterForm onSubmit={handleRegister} />
        {errors.email && <p className="error-message">{errors.email}</p>}
        {errors.password && <p className="error-message">{errors.password}</p>}
        <p>
          Already have an account?{" "}
          <Link to="/login" className="switch-button">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
