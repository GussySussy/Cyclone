import { Socket } from "socket.io";
import { RoomManager } from "../managers/RoomManager";
import { Room } from "../models/Room";
import { createErrorResponse, createSuccessResponse } from "../utils/responses";

enum game_events {
  SUBMIT_ANSWER = "submit_answer",
  START_GAME = "start_game",
}

export class GameEventHandler {
  private socket: Socket;
  private room: Room | null = null;

  constructor(socket: Socket) {
    this.socket = socket;
    this.registerEvents();
  }

  private registerEvents() {
    this.socket.on(game_events.START_GAME, this.startGame);
    this.socket.on(game_events.SUBMIT_ANSWER, this.submitAnswer);
  }

  private startGame = (
    room_code: string,
    callback: (response: any) => void
  ) => {
    this.room = RoomManager.getRoom(room_code);
    if (this.room) {
      callback(
        createSuccessResponse({}, `OK: Game started in room ${room_code}`)
      );
    } else {
      callback(createErrorResponse("ERROR: Game could not be created"));
    }
  };

  private submitAnswer = (
    answer: string,
    callback: (response: any) => void
  ) => {
    if (!this.room) {
      callback({ success: false, message: "Game has not started yet." });
      return;
    }

    callback({
      success: true,
      message: `Answer received in room ${this.room.room_code}`,
    });
  };
}
