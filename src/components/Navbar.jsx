import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
 import { useEffect, useState } from "react";
import { api } from "../service/api";
import {
   HomeIcon,
   UsersIcon,
  ChevronDown,
  ShieldCheckIcon,
} from "lucide-react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";



const Navbar = () => {
   const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const user = localStorage.getItem("user");
   const [ userProfile,setUsers] = useState([]);
   //  const navigate = useNavigate();


  const parsedUser = JSON.parse(user);
   const firstLetter = parsedUser?.email?.charAt(0)?.toUpperCase() || "?";
  
 
 
   useEffect(() => {
      const fetchOrgs = async () => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
  
        const parsedUser = JSON.parse(user);
        if (!token) return;
  
        try {
          console.log(12345555, parsedUser)
   
          const [res] = await Promise.all([ 
                    api.post("https://streamify-backend-9m71.onrender.com/api/auth/userById", { orgId: parsedUser?.id || null } )
                   ]);
 
           setUsers(res.data); 
    
   
        } catch (err) {
          console.error("Failed to fetch organizations:", err);
        }
      };
  
      fetchOrgs();
    }, []);
      // console.log(addData)
  

  


  const logout = async () => {
    try {
     let log = await axios.post("https://streamify-backend-9m71.onrender.com/api/auth/logout", {}, { withCredentials: true });
      // optional: refresh authUser
      if (log.data.success) {   
      window.location.href = "/login"; // redirect to login
      toast(log.data.message)

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
 
 
  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
<div className="flex items-center gap-3 p-2">
  {/* Avatar */}
    {parsedUser?.email}

  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 
                  text-white flex items-center justify-center text-lg font-semibold">

    {firstLetter}
  </div>

  {/* User Info */}
  <div className="flex flex-col">
    <h4 className="text-sm font-semibold text-gray-900">
      {user?.name}
    </h4>
    <p className="text-xs text-gray-500">
      {user?.email}
    </p>
  </div>
    {/* <button
           className="p-2 hover:bg-green-600 rounded"
        >
          <UsersIcon />
        </button> */}
</div>
  {/* {parsedUser.role === "ADMIN" && (
                
                <button
              className="text-xs ml-9 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={()=> setIsModalOpen(true)}
            >
              Add user  
            </button>
            )} */}

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

          {/* <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div> */}

          {/* TODO */}
          {/* <ThemeSelector /> */}
{/* 
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
            </div>
          </div> */}
{/* {showMembers && (
          <div className="w-64 bg-white border-l">
            <div className="h-14 border-b flex items-center px-4 font-semibold">
              Members
            </div>

            {userProfile.map((m) => (
              <div key={m.id} className="px-4 py-3 border-b">
                <p className="font-medium">{m.name}</p>
                <span className="text-xs text-gray-400">{m.role}</span>
                  <div className="flex flex-col gap-1">
            <button
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              // onClick={() => console.log("Add as admin:", member.id)}
            >
              Add as Admin
            </button>
            <button
              className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              // onClick={() => console.log("Remove admin:", member.id)}
            >
              Remove  
            </button>
          </div>
              </div>
            ))}
          </div>
        )} */}
          {/* Logout button */}
          <button className="btn btn-ghost btn-circle"  onClick={logout}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
