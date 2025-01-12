import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/authUtils";

interface LoginFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  rememberedEmail: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, rememberedEmail }) => {
  const [email, setEmail] = useState(rememberedEmail || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(!!rememberedEmail);
  
  const navigate = useNavigate(); 

  useEffect(() => {
    const authToken = getToken();
    if (authToken) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", email, password, "Remember Me:", rememberMe);
    onSubmit(email, password, rememberMe);
  };

  return (
  <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        autoComplete="email"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        autoComplete="current-password"
      />
      <div className="remember-me-container">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          id="rememberMe"
        />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
