import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "https://streamify-backend-9m71.onrender.com";

export const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const socketInstance = io(SOCKET_URL, {
      auth: {
        userId, // required by backend middleware
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userId]);

  return socket;
};
