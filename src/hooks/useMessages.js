import { useState, useEffect } from "react";

export const useMessages = (socket, groupId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket || !groupId) return;

    socket.emit("joinGroup", groupId);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.emit("leaveGroup", groupId);
      socket.off("receiveMessage");
    };
  }, [socket, groupId]);

  const sendMessage = (text) => {
    if (!socket || !groupId) return;

    socket.emit("sendMessage", {
      groupId,
      message: { text },
    });
  };

  return {
    messages,
    setMessages,  
    sendMessage,
  };
};
