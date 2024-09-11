import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { registerSocketEvents } from "./socket";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

registerSocketEvents(io);

server.listen(5174, () => {
  console.log("Server running at http://localhost:5174");
});
