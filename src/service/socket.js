import io from "socket.io-client";

export const socket = io("https://streamify-backend-9m71.onrender.com", {
  auth: {
    userId: JSON.parse(localStorage.getItem("user"))?.id
  }
});
