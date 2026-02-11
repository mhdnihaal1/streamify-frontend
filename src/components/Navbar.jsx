import { Link, useLocation } from "react-router";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
// import ThemeSelector from "./ThemeSelector";
// import { useEffect, useState } from "react";
import { api } from "../service/api";
import {
  HomeIcon,
  UsersIcon,
  ChevronDown,
  ShieldCheckIcon,
} from "lucide-react";

import toast from "react-hot-toast";

const Navbar = () => {
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const user = localStorage.getItem("user");

  const parsedUser = JSON.parse(user);
  const firstLetter = parsedUser?.email?.charAt(0)?.toUpperCase() || "?";

  const logout = async () => {
    try {
      let log = await api.post("/auth/logout", {}, { withCredentials: true });
      if (log.data.success) {
        window.location.href = "/login"; 
        toast(log.data.message);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          <div className="flex items-center gap-3 p-2">
             {parsedUser?.email}

            <div
              className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 
                  text-white flex items-center justify-center text-lg font-semibold"
            >
              {firstLetter}
            </div>

             <div className="flex flex-col">
              <h4 className="text-sm font-semibold text-gray-900">
                {user?.name}
              </h4>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  Streamify
                </span>
              </Link>
            </div>
          )}

           <button className="btn btn-ghost btn-circle" onClick={logout}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
