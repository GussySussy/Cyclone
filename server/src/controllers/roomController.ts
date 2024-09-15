import { Socket } from "socket.io";
import { createSuccessResponse, createErrorResponse } from "../utils/responses";
import { RoomManager } from "../managers/RoomManager";

enum room_events {
  CREATE_ROOM = "create_room",
  JOIN_ROOM = "join_room",
  EXIT_ROOM = "exit_room",
  GET_PLAYERS = "get_players",
  START_GAME = "start_game",
  SEND_MESSAGE = "send_message",
  RECEIVE_MESSAGE = "receive_message",
  UPDATE_PLAYERS = "update_players",
}

export const handleRoomEvents = (socket: Socket) => {
  socket.on(room_events.CREATE_ROOM, (nickname: string, callback) => {
    console.log(`Received CREATE_ROOM request with nickname: ${nickname}`);
    const room = RoomManager.createRoom(socket, nickname);
    if (room) {
      const room_code = room.room_code;
      console.log(
        `Created a room with room_code : ${room_code} for user with nickname: ${nickname}`
      );
      callback(
        createSuccessResponse(
          { room_code: room_code },
          `OK: Room created with room code ${room_code}`
        )
      );
    } else {
      console.error(
        `Could not create a room for user with nickname: ${nickname}`
      );
      callback(createErrorResponse("ERROR: Could not create a room."));
    }
  });

  socket.on(
    room_events.JOIN_ROOM,
    (nickname: string, room_code: string, callback) => {
      const room = RoomManager.joinRoom(socket, nickname, room_code);
      if (room) {
        const room_code = room.room_code;
        callback(
          createSuccessResponse(
            { room_code: room_code },
            `OK: Joined room with room code ${room_code}`
          )
        );
      } else {
        callback(
          createErrorResponse(
            "ERROR: Could not join room. Re check the room code and try again."
          )
        );
      }
    }
  );

  socket.on(room_events.EXIT_ROOM, (room_code: string, callback) => {
    const room = RoomManager.leaveRoom(room_code, socket);
    if (room) {
      callback(createSuccessResponse({}, "OK: Left the room"));
    } else {
      callback(createErrorResponse("ERROR: could not leave the room."));
    }
  });

  socket.on(room_events.GET_PLAYERS, (room_code: string, callback) => {
    const room = RoomManager.getRoom(room_code);
    if (room) {
      const players = room.getPlayers();
      console.log(
        "Successfully retrieved and sent lobby player list...",
        players
      );
      callback(createSuccessResponse(players, "OK : Player information sent"));
    } else {
      console.log("Could not retrieve and send lobby player list...");
      callback(
        createErrorResponse("ERROR : Could not retrieve player information")
      );
    }
  });

  socket.on(
    room_events.SEND_MESSAGE,
    (room_code: string, message: string, callback) => {
      const room = RoomManager.getRoom(room_code);
      if (room) {
        console.log("Successfully sent message");
        socket.to(room.room_code).emit("receive_message", {
          nickname: room.getPlayer(socket.id).nickname,
          message: message,
        });
        callback(createSuccessResponse({}, "OK : Message sent"));
      } else {
        console.log("Could not send message");
        callback(createErrorResponse("ERROR : Could not send message"));
      }
    }
  );
};
