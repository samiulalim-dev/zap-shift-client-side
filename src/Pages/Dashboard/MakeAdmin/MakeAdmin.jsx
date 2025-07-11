import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";

const MakeAdmin = () => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const [triggerSearch, setTriggerSearch] = useState("");

  const {
    data: filteredUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", triggerSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
    keepPreviousData: true,
  });
  const handleSearchClick = () => {
    setTriggerSearch(search); // 🔁 এবারই API call হবে
  };

  const handleMakeAdmin = async (id) => {
    try {
      await axiosSecure.patch(`/users/admin/${id}`);
      Swal.fire("Success!", "User has been made an admin.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error!", "Failed to make admin.", "error");
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      await axiosSecure.patch(`/users/remove_admin/${id}`);
      Swal.fire("Success!", "Admin role removed successfully.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error!", "Failed to remove admin.", "error");
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* ✅ Search Input */}
      <div className="flex   gap-1">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-sm mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearchClick} className="btn btn-primary">
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.role || "user"}</td>
                <td className="text-center">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user._id)}
                      className="btn btn-xs btn-warning"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs btn-success"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default MakeAdmin;
