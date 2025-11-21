import { io } from "socket.io-client";

// Socket.io connects to root namespace, not /api/v1
const SOCKET_URL = import.meta.env.VITE_API_URL?.replace("/api/v1", "") || "http://localhost:3000";

export const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  autoConnect: false, // Don't connect automatically
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  withCredentials: true,
});
