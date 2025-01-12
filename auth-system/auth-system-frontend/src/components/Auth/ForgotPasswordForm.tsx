import React, { useState } from "react";

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Submit</button>
      <p style={{ marginTop: "10px" }}>
        Remembered your password?{" "}
        <a href="/login" className="switch-button">
          Login
        </a>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
