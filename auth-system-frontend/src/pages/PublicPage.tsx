import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

interface PublicPageProps {
  isAuthenticated: boolean;
}

const PublicPage: React.FC<PublicPageProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Auth System</h1>
        <p>This is the sample Public Home page available for all public users. We can show all the public contents here.</p>
        {!isAuthenticated && (
          <div className="button-group">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicPage;
