import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "./ManageUsersPage.css";
import { toast } from "react-toastify";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

const ManageUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
 const [passwords, setPasswords] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/users");
        setUsers(response.data.users);
      } catch (err: any) {
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = async (id: number, updatedUser: Partial<User>) => {
    try {
      if (passwords[id]) {
        updatedUser.password = passwords[id];
      }

      await api.put(`/admin/users/${id}/update`, { ...updatedUser });
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
      );
      toast.success("User updated successfully.");
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            console.error("Error during registration:", error.response.data.message);
            toast.error("Error: "+ error.response.data.message);
        } else {
          toast.error("An error occurred during registration.");
        }
    }
  };

  const handleRoleChange = (userId: number, role: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role } : user
      )
    );
  };

  const handleIsActiveChange = (userId: number, isActive: boolean) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isActive } : user
      )
    );
  };

  const handlePasswordChange = (userId: number, newPassword: string) => {
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [userId]: newPassword,
    }));
  };

  const handleBackClick = () => {
    navigate("/home");
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="manage-users-container">
      <button className="back-btn" onClick={handleBackClick}>
        Back to Home
      </button>
      <h1>Manage Users</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  className="input-field"
                  type="text"
                  value={user.name}
                  onChange={(e) =>
                    setUsers((prevUsers) =>
                      prevUsers.map((u) =>
                        u.id === user.id ? { ...u, name: e.target.value } : u
                      )
                    )
                  }
                />
              </td>
              <td>
                <input
                  className="input-field"
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    setUsers((prevUsers) =>
                      prevUsers.map((u) =>
                        u.id === user.id ? { ...u, email: e.target.value } : u
                      )
                    )
                  }
                />
              </td>
              <td>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Enter new password (optional)"
                  onChange={(e) => handlePasswordChange(user.id, e.target.value)}
                />
              </td>
              <td>
                <select
                  className="select-field"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td>
                <input
                  className="checkbox-field"
                  type="checkbox"
                  checked={user.isActive}
                  onChange={(e) => handleIsActiveChange(user.id, e.target.checked)}
                />
              </td>
              <td>
                <button
                  className="save-btn"
                  onClick={() =>
                    handleEditUser(user.id, {
                      name: user.name,
                      email: user.email,
                      role: user.role,
                      isActive: user.isActive,
                    })
                  }
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsersPage;
