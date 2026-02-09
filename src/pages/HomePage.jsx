import { useEffect, useRef, useState } from "react";
import { UsersIcon, ShipWheelIcon } from "lucide-react";
 import AddUserModal from "../components/AddUserModal";
import toast from "react-hot-toast";

import { useSocket } from "../hooks/useSocket";
import { useMessages } from "../hooks/useMessages";
import { api } from "../service/api";
import axios from "axios";

const HomePage = ({ groupi, userId }) => {
  const [input, setInput] = useState("");
  const [showMembers, setShowMembers] = useState(false);
  // const [group, setGroup] = useState([]);
  const [message, setMessage] = useState([]);
  // const [userProfile, setUsers] = useState([]);
  // const [organization, setOrganization] = useState([]);
  // const [res, setRes] = useState([]);

  const [open, setOpen] = useState(false);

  // const [members, setMembers] = useState([]);
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  // console.log("user :",parsedUser)
  const messagesEndRef = useRef(null);
  const socket = useSocket(parsedUser.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  const { messages, setMessages, sendMessage } = useMessages(
    socket,
    groupi?.id,
  );

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        // if (!groupi?.id) return;

        const [user, msgRes, org, groupRes, organizaito, res] =
          await Promise.all([
            api.post("http://localhost:3000/api/auth/userById", {
              userId: parsedUser?.id || null,
            }),
            api.post("http://localhost:3000/api/groups/messages", {
              groupId: groupi?.id,
              userId: parsedUser.id,
            }),
            api.post("http://localhost:3000/api/auth/orgUser", {
              orgId: parsedUser?.orgId || null,
            }),
            api.post("http://localhost:3000/api/groups/group", {
              groupId: groupi?.id || null,
            }),
            api.get("http://localhost:3000/api/groups/organization"),
            // api.post("http://localhost:3000/api/groups/removeUsers", {   groupId: groupi?.id,userId:parsedUser.id,orgId:parsedUser.orgId || null}),
          ]);

         setMessage(msgRes.data.data || []);
        setMessages(msgRes.data.data || []);
        if (org.data.org) setOrganizations(org.data.org || []);
        // if (groupRes.data.data) setGroup(groupRes.data.data);
        // setOrganization(organizaito.data.data);
        // setRes(res.data.data);

        // console.log("member", memberRes.data.data)
        // setMembers(memberRes.data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchOrgs();
  }, [groupi?.id, parsedUser.id, setMessages, userId]);

  // ⬇️ auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
     sendMessage(input);
    let res = await axios.post("http://localhost:3000/api/groups/sendMessage", {
      senderId: parsedUser.id,
      groupId: groupi?.id || null,
      text: input,
    });
    setInput("");
    toast(res.data.message)
  };
   const [addData, setAddData] = useState({
    fullName: "",
    email: "",
    password: "",
    orgId: "",
    group: [],
    role: "MEMBER",
  });

  useEffect(() => {
    if (groupi) {
      setAddData((prev) => ({
        ...prev,
        orgId: groupi.orgId,
        group: [groupi.id],
      }));
    }
  }, [groupi]);

  const handleAddUser = async (e) => {
    e.preventDefault();
     try {
      let res = await axios.post("http://localhost:3000/api/auth/addUser", {
        addData,
      });

      setIsModalOpen(false);
      toast(res.data.message)

     } catch (err) {
      console.error("Error adding user to group:", err);
    }
  };

 

  // Show placeholder when no group is selected
  if (!groupi?.id) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-32 mb-4 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14l4 4-4-4z"
          />
        </svg>
        <h2 className="text-2xl font-semibold mb-2">Welcome to Chat!</h2>
        <p className="text-center max-w-xs">
          Select a group from the sidebar to start messaging. Your conversations
          will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* HEADER */}
      <div className="h-14 bg-green-500 text-white flex items-center justify-between px-4">
        <div>
          <h2 className="font-semibold">{groupi?.name}</h2>
          <p className="text-xs text-green-100">Active</p>
        </div>

        <button
          onClick={() => setShowMembers(!showMembers)}
          className="p-2 hover:bg-green-600 rounded"
        >
          <UsersIcon />
        </button>
      </div>

      <div className="flex flex-1">
        {/* CHAT */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.senderId === parsedUser.id
                    ? "ml-auto bg-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="h-16 bg-white border-t flex items-center px-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-4 py-2"
            />
            <button
              onClick={handleSend}
              className="ml-3 bg-green-500 text-white px-4 py-2 rounded-full"
            >
              Send
            </button>
          </div>
        </div>

        {showMembers && (
          <div className="w-64 bg-white border-l">
            <div className="h-14 border-b flex items-center px-4 font-semibold">
              Admin
              {parsedUser.role === "ADMIN" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm ml-9 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
                >
                  + Add User
                </button>
              )}
            </div>
            <span className="block px-4 py-2 text-sm text-gray-600">
              {organizations[0]?.users
                ?.filter((user) => user.role === "ADMIN")
                .map((user) => (
                  <div key={user.id} className="px-4 py-3 border-b">
                    <p className="font-small text-black">{user.name}</p>
                    {/* <span className="text-xs text-gray-400">{user.role}</span> */}
                  </div>
                ))}
            </span>

            <div className="h-14 border-b flex items-center px-4 font-semibold">
              Members
            </div>

            {organizations[0]?.users
              ?.filter((user) => user.role === "MEMBER")
              .map((user) => (
                <div key={user.id} className="px-4 py-3 border-b">
                  <p className="font-small text-black">{user.name}</p>
                  {/* <span className="text-xs text-gray-400">{user.role}</span> */}
                </div>
              ))}
          </div>
        )}
      </div>
      {open && (
        <div className="relative w-64">
          {/* Button */}
          <button
            onClick={() => setOpen(!open)}
            className="w-full border px-4 py-2 rounded bg-white text-left"
          >
            Select User / Group
          </button>
        </div>
      )}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addData={addData}
        setAddData={setAddData}
        handleAddUser={handleAddUser}
      />
    </div>
  );
};

export default HomePage;
