import { useState, useEffect } from "react";
import API_BASE_URL from "../config/api";
import "../styles/Admin.scss";

// Admin panel component for managing users
const Admin = ({ user, onShowModal }) => {
  // State management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const token = localStorage.getItem("authToken");

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/auth/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      onShowModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: error.message,
        actions: [],
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete user with confirmation
  const handleDeleteUser = (userId, userName) => {
    onShowModal({
      isOpen: true,
      type: "confirm",
      title: "Confirm Delete",
      message: `Are you sure you want to delete ${userName}?`,
      actions: [
        {
          text: "Cancel",
          onClick: () => onShowModal({ isOpen: false }),
        },
        {
          text: "Delete",
          onClick: async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/api/auth/admin/users/${userId}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (!response.ok) {
                throw new Error("Failed to delete user");
              }

              // Remove user from local state
              setUsers(users.filter((u) => u._id !== userId));
              onShowModal({
                isOpen: true,
                type: "success",
                title: "Success",
                message: "User deleted successfully",
                actions: [],
              });
            } catch (error) {
              onShowModal({
                isOpen: true,
                type: "error",
                title: "Error",
                message: error.message,
                actions: [],
              });
            }
          },
        },
      ],
    });
  };

  // Toggle user admin status
  const handleToggleAdmin = async (userId, currentAdminStatus, userName) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/admin/users/${userId}/toggle-admin`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      
      // Update user in local state
      setUsers(
        users.map((u) => (u._id === userId ? { ...u, isAdmin: data.user.isAdmin } : u))
      );

      onShowModal({
        isOpen: true,
        type: "success",
        title: "Success",
        message: data.message,
        actions: [],
      });
    } catch (error) {
      onShowModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: error.message,
        actions: [],
      });
    }
  };

  // Create new user
  const handleAddUser = async (e) => {
    e.preventDefault();

    // Validate all fields filled
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      onShowModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "All fields are required",
        actions: [],
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      
      // Add new user to local state
      setUsers([...users, data.user]);
      
      // Reset form
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      setShowAddForm(false);

      onShowModal({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "User created successfully",
        actions: [],
      });
    } catch (error) {
      onShowModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: error.message,
        actions: [],
      });
    }
  };

  // Update form field values
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Check if user has admin access
  if (!user || !user.isAdmin) {
    return (
      <div className="admin-container">
        <div className="admin-error">
          <h2>Access Denied</h2>
          <p>You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="admin-container">
        <div className="admin-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Header with add user button */}
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button
          className="btn-add-user"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add New User"}
        </button>
      </div>

      {/* Add user form (conditional) */}
      {showAddForm && (
        <div className="admin-add-user-form">
          <h2>Create New User</h2>
          <form onSubmit={handleAddUser}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                placeholder="Enter first name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                placeholder="Enter last name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="btn-submit">
              Create User
            </button>
          </form>
        </div>
      )}

      {/* Users table */}
      <div className="admin-users-section">
        <h2>User Management ({users.length} users)</h2>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Auth Provider</th>
                <th>Admin Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className={u.isAdmin ? "admin-user" : ""}>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`provider-badge ${u.authProvider}`}>
                      {u.authProvider}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${u.isAdmin ? "admin" : "user"}`}>
                      {u.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    {/* Toggle admin button */}
                    <button
                      className={`btn-toggle-admin ${u.isAdmin ? "remove" : "make"}`}
                      onClick={() =>
                        handleToggleAdmin(u._id, u.isAdmin, `${u.firstName} ${u.lastName}`)
                      }
                      disabled={u._id === user.id}
                      title={u._id === user.id ? "Cannot modify your own status" : ""}
                    >
                      {u.isAdmin ? "Remove Admin" : "Make Admin"}
                    </button>
                    {/* Delete user button */}
                    <button
                      className="btn-delete"
                      onClick={() =>
                        handleDeleteUser(u._id, `${u.firstName} ${u.lastName}`)
                      }
                      disabled={u._id === user.id}
                      title={u._id === user.id ? "Cannot delete yourself" : ""}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;