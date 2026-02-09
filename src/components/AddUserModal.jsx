import React from "react";
import { UsersIcon,ShipWheelIcon } from "lucide-react";

const AddUserModal = ({ isOpen, onClose, addData, setAddData, handleAddUser }) => {
  if (!isOpen) return null; // don't render if modal is closed

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Logo */}
        <div className="mb-4 flex items-center gap-2">
          <ShipWheelIcon className="size-7 text-primary" />
          <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Streamify
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Add New User</h2>
          </div>

          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              placeholder="John Doe"
              value={addData.fullName}
              onChange={(e) =>
                setAddData({ ...addData, fullName: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              placeholder="john@gmail.com"
              value={addData.email}
              onChange={(e) =>
                setAddData({ ...addData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Role */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`btn w-1/2 ${
                  addData.role === "MEMBER" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setAddData({ ...addData, role: "MEMBER" })}
              >
                MEMBER
              </button>
              <button
                type="button"
                className={`btn w-1/2 ${
                  addData.role === "ADMIN" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setAddData({ ...addData, role: "ADMIN" })}
              >
                ADMIN
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              placeholder="********"
              value={addData.password}
              onChange={(e) =>
                setAddData({ ...addData, password: e.target.value })
              }
              required
            />
            <p className="text-xs opacity-70 mt-1">
              Password must be at least 6 characters long
            </p>
          </div>

          <button className="btn btn-primary w-full" type="submit">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
