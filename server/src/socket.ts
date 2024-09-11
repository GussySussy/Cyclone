import { Server, Socket } from "socket.io";
import { handleRoomEvents } from "./controllers/roomController";
import { GameEventHandler } from "./controllers/gameController";

export const registerSocketEvents = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`User ${socket.id} connected`);

    handleRoomEvents(socket);
    new GameEventHandler(socket);

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};
