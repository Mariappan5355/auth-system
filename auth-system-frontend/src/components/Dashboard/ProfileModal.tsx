import React, { useState } from "react";
import Modal from "react-modal";
import api from "../../utils/api";
import { toast } from "react-toastify";

interface ProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  userData: { name: string; email: string };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onRequestClose, userData }) => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.put("/user/profile", { name, email });

      console.log("Profile updated successfully:", response.data);
      toast.success("Profile updated successfully!");
      onRequestClose(); 
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            console.error("Error during update:", error.response.data.message);
            toast.error("Error: "+ error.response.data.message);
        } else {
          toast.error("An error occurred during update.");
        }

      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Profile"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <button onClick={onRequestClose} className="close-button">&times;</button>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input 
          type="email" 
          value={email} 
          onChange={handleEmailChange}
          disabled={isLoading} 
        />
        <br />
        <label>Name: </label>
        <input 
          type="text" 
          value={name} 
          onChange={handleNameChange}
          disabled={isLoading}
        />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </Modal>
  );
};

export default ProfileModal;
