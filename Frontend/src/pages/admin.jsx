import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ role: "", skills: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
        setFilteredUsers(data);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.email);
    setFormData({
      role: user.role,
      skills: user.skills?.join(", "),
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/update-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: editingUser,
          role: formData.role,
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data.error || "Failed to update user");
        return;
      }

      setEditingUser(null);
      setFormData({ role: "", skills: "" });
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter((user) => user.email.toLowerCase().includes(query))
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4 md:px-8 bg-[#0e0e10] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-cyan-400">Admin Panel - Manage Users</h1>

          <input
            type="text"
            className="input input-bordered w-full mb-8 bg-[#1c1c1e] text-white placeholder-gray-400"
            placeholder="Search users by email..."
            value={searchQuery}
            onChange={handleSearch}
          />

          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-[#1a1a1c] border border-[#2a2a2e] rounded-2xl p-5 mb-5 shadow-md hover:shadow-cyan-600/20 transition-shadow duration-300"
            >
              <p><span className="font-semibold text-cyan-300">Email:</span> {user.email}</p>
              <p><span className="font-semibold text-purple-300">Role:</span> {user.role}</p>
              <p><span className="font-semibold text-yellow-300">Skills:</span> {user.skills?.length ? user.skills.join(", ") : "N/A"}</p>

              {editingUser === user.email ? (
                <div className="mt-4 space-y-3">
                  <select
                    className="select select-bordered w-full bg-[#121212] text-white"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Comma-separated skills"
                    className="input input-bordered w-full bg-[#121212] text-white placeholder-gray-400"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  />

                  <div className="flex gap-3">
                    <button
                      className="btn btn-success hover:scale-105 transition-transform"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-outline hover:bg-red-500 hover:text-white"
                      onClick={() => setEditingUser(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-info mt-4 hover:scale-105 transition-transform"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
