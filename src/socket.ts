"use client";

import { io } from "socket.io-client";

export const socket = io("http://localhost:3182", {
  autoConnect: false,
});

socket.on("connect", () => {
  console.log("connected: ", socket.id);
});

socket.on("disconnect", () => {
  console.log("disconnected: ", socket.id);
});
