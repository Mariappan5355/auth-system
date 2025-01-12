import React from "react";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import "./LoginPage.css";

const ForgotPasswordPage: React.FC = () => {
  const handleForgotPassword = (email: string) => {
    console.log("Password reset request submitted for:", email);
    alert("Todo: Send an email to reset the password")
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Forgot Password</h1>
        <ForgotPasswordForm onSubmit={handleForgotPassword} />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
