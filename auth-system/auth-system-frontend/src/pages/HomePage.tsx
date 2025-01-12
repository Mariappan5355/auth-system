import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import api from "../utils/api";
import ProfileModal from "../components/Dashboard/ProfileModal";
import ChangePasswordModal from "../components/Dashboard/ChangePasswordModal";
import { toast } from "react-toastify";

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<{ name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/user/profile");
        setUserData(response.data.user);
      } catch (error) {
        toast.error("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isAdmin = userData?.role === "admin";

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Welcome to Your Dashboard</h1>
        {userData && (
          <>
            <h2>Hello, {userData.name}!</h2>
            <p>Your role: {userData.role}</p>

            <div className="user-actions">
              <h3>Available Actions</h3>
              <ul>
                <li>
                  <button onClick={() => setIsProfileModalOpen(true)} className="action-button">
                    Update Profile
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsPasswordModalOpen(true)} className="action-button">
                    Change Password
                  </button>
                </li>
                {isAdmin && (
                  <li>
                    <button onClick={() => navigate("/manage-users")} className="action-button">
                      Manage User Accounts
                    </button>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="action-button">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Profile Modal */}
      {userData && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onRequestClose={() => setIsProfileModalOpen(false)}
          userData={userData}
        />
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onRequestClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
