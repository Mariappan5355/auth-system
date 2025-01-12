import React, { useState } from "react";
import Modal from "react-modal";
import api from "../../utils/api";
import { toast } from "react-toastify";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await api.put("/user/change-password", { currentPassword, newPassword });
      toast.success("Password updated successfully!");
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
      contentLabel="Change Password"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <button onClick={onRequestClose} className="close-button">
        &times;
      </button>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Current Password:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          required
          disabled={isLoading}
        />
        <br />
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
          disabled={isLoading}
        />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </Modal>
  );
};

export default ChangePasswordModal;
