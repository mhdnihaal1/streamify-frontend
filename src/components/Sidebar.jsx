import { Link } from "react-router";
import { useEffect, useState } from "react";
// import useAuthUser from "../hooks/useAuthUser";
import { api } from "../service/api";
import toast from "react-hot-toast";

//  import {  ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  BellIcon,
  HomeIcon,
  ShipWheelIcon,
  UsersIcon,
  ChevronDown,
  ShieldCheckIcon,
} from "lucide-react";

import axios from "axios";

const Sidebar = ({ onGroupClick }) => {
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  // const [showAddMembertoOrgModal, setShowAddMembertoOrgModal] = useState(false);
  // const [showAddMembertogrpModal, setShowAddMembertogrpModal] = useState(false);
  const [userProfile, setUsers] = useState([]);
  // const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState(null);
  // const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  // selected = { type: "USER" | "GROUP", data: {...} }
  // const [groups, setGroup] = useState([]);
  const user = localStorage.getItem("user");

  const parsedUser = JSON.parse(user);
  const [orgName, setOrgName] = useState("");
  const [groupName, setGroupName] = useState("");
  //  const [open, setOpen] = useState(false);

  // const { authUser } = useAuthUser();
  // const location = useLocation();
  // const currentPath = location.pathname;
  const [organizations, setOrganizations] = useState([]);
  const [groupss, setGroup] = useState([]);

  const [orga, setOrga] = useState([]);

  // console.log(123, parsedUser)
  // const [selectedOrg, setSelectedOrg] = useState(null);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);
  // const [selectedUserIds, setSelectedUserIds] = useState([]);

  useEffect(() => {
    const fetchOrgs = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;
      try {
        console.log(
          "123455551111111111",
          parsedUser.id,
          organizations,
          parsedUser?.orgId,
        );
        //       org: true,
        //       ownedGroups:true,
        //       memberships: true,
        //       messages: true,
  toast.success("User added successfully");

        const [user, orga, member, org, groupRes] = await Promise.all([
          api.post("https://streamify-backend-9m71.onrender.com/api/auth/userById", {
            userId: parsedUser?.id || null,
          }),
          api.post("https://streamify-backend-9m71.onrender.com/api/groups/organizationById", {
            orgId: parsedUser?.orgId || null,
          }),
          api.post("https://streamify-backend-9m71.onrender.com/api/groups/groupMember", {
            userId: parsedUser?.id || null,
          }),
          api.post("https://streamify-backend-9m71.onrender.com/api/auth/orgUser", {
            orgId: parsedUser?.orgId || null,
          }),
          api.post("https://streamify-backend-9m71.onrender.com/api/groups/groups", {
            userId: parsedUser.id,
          }),
        ]);

        setUsers(user.data);
        setOrga(orga.data.data);
        setOrganizations(org.data.org || []);
        setGroup(groupRes.data.data);
      } catch (err) {
        console.error("Failed to fetch organizations:", err);
      }
    };

    fetchOrgs();
  }, []);

  const handleCreateOrg = async () => {
    const res = await axios.post("https://streamify-backend-9m71.onrender.com/api/groups/createOrg", {
      userId: parsedUser?.id || null,
      name: orgName,
    });
  toast.success(res.data.message);

    setOrgName("");
    setShowOrgModal(false);
  };

  const handleCreateGroup = async () => {
    const res = await axios.post("https://streamify-backend-9m71.onrender.com/api/groups/createGrp", {
      userId: parsedUser?.id || null,
      name: groupName,
      orgId: userProfile?.org?.id || null,
    });
    setGroupName("");
    setShowGroupModal(false);
  };

  const handleGroupClick = (group) => {
    setActiveGroupId(group);
    onGroupClick(group);
  };

  const handleAddMember = async ({ userId, groupId }) => {
    // return
    let res = await axios.post(
      "https://streamify-backend-9m71.onrender.com/api/groups/addGrp-members",
      { userId, groupId },
    );
    setSelectedUserId(null);
    setSelectedGroupId(null);
  };

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
            Streamify
          </span>
        </Link>
      </div>

      {/* Organization Dropdown */}
      <div className="dropdown w-full">
        <label
          tabIndex={0}
          className={`btn btn-ghost justify-between w-full gap-3 px-3 normal-case `}
          // onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <HomeIcon className="w-5 h-5 text-base-content opacity-70" />
          <span>{organizations[0]?.name || "Select Organization"}</span>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </label>
        {/* <ul
          tabIndex={0}
          className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full mt-1 `}
        >
          {organizations.name}
        </ul> */}
      </div>

      <div className="h-full flex flex-col justify-between">
        <nav className="space-y-1">
          <div className="ml-6 space-y-1 mt-2">
            {parsedUser.role == "ADMIN"
              ? organizations[0]?.groups?.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => handleGroupClick(group.id)}
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                      activeGroupId === group.id ? "bg-gray-900 font-bold" : ""
                    }`}
                  >
                    {group.name}
                  </button>
                ))
              : groupss?.map((group) => (
                  <button
                    key={group?.group.id}
                    onClick={() => handleGroupClick(group?.group.id)}
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
                      activeGroupId === group?.group.id
                        ? "bg-gray-900 font-bold"
                        : ""
                    }`}
                  >
                    {group?.group.name}
                  </button>
                ))}
          </div>
        </nav>

         {parsedUser && parsedUser.role === "ADMIN" && (
          <div className="px-4 py-2">
            <nav className="mb-4 space-y-1 border-b-2 border-gray-300">
              <Link
                className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case `}
              >
                <ShieldCheckIcon className="w-5 h-5 text-base-content opacity-70" />
                <span>Admin Panel</span>
              </Link>
            </nav>
            <nav className="mb-4 space-y-1">
              {!userProfile?.org?.id && (
                <button
                  className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case `}
                  onClick={() => setShowOrgModal(true)}
                >
                  <UsersIcon className="w-5 h-5 text-base-content opacity-70" />
                  <span>Create Organization</span>
                </button>
              )}

              <button
                className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case `}
                onClick={() => setShowGroupModal(true)}
              >
                <BellIcon className="w-5 h-5 text-base-content opacity-70" />
                <span>Create Group</span>
              </button>
              <button
                className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case `}
                onClick={() => setShowAddMemberModal(true)}
              >
                <UsersIcon className="w-5 h-5 text-base-content opacity-70" />
                <span>Add Group member</span>
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Organization Modal */}
      {showOrgModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Create Organization</h2>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Organization Name"
              className="w-full border rounded px-3 py-2 mb-4 outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => setShowOrgModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCreateOrg}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Group Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Create Group</h2>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group Name"
              className="w-full border rounded px-3 py-2 mb-4 outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => setShowGroupModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCreateGroup}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Dropdown */}
      {showAddMemberModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Add Member</h2>

            {/* Select User */}
            <select
              className="w-full border px-3 py-2 rounded mb-3"
              value={selectedUserId || ""}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select User</option>
              {orga?.users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {/* Select Group */}
            <select
              className="w-full border px-3 py-2 rounded mb-4"
              value={selectedGroupId || ""}
              onChange={(e) => setSelectedGroupId(e.target.value)}
            >
              <option value="">Select Group</option>
              {orga?.groups?.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => setShowAddMemberModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                disabled={!selectedUserId && !selectedGroupId}
                onClick={() => {
                  handleAddMember({
                    userId: selectedUserId,
                    groupId: selectedGroupId,
                  });
                  setShowAddMemberModal(false);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
export default Sidebar;
