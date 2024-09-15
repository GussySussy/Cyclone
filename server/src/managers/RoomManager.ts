import { Socket } from "socket.io";
import { Room } from "../models/Room";

export class RoomManager {
  private static rooms: { [key: string]: Room } = {};

  public static createRoom = (socket: Socket, nickname: string): Room => {
    // const room_code = `room_${Math.floor(Math.random() * 100)}`;
    const room_code = `room_01`;
    const room = new Room(room_code);
    room.addPlayer(socket.id, nickname);
    socket.join(room_code);
    RoomManager.rooms[room_code] = room;
    return room;
  };

  public static joinRoom = (
    socket: Socket,
    nickname: string,
    room_code: string
  ) => {
    const room = RoomManager.getRoom(room_code);
    if (room) {
      room.addPlayer(socket.id, nickname);
      socket.join(room_code);
      return room;
    } else {
      return false;
    }
  };

  public static getRoom = (room_code: string): Room | null => {
    return RoomManager.rooms[room_code] || null;
  };

  public static leaveRoom(room_code: string, socket: Socket): boolean {
    const room = RoomManager.getRoom(room_code);
    if (room) {
      room.removePlayer(socket.id);
      socket.leave(room_code);
      socket.to(room_code).emit("update_players", room.getPlayers());
      return true;
    } else {
      return false;
    }
  }

  public static removeRoom(room_code: string): void {
    const room = RoomManager.getRoom(room_code);
    if (room) {
      delete RoomManager.rooms[room_code];
      console.log(`The room ${room_code} has been deleted`);
    }
  }

  public static getRoomList = () => {
    return Object.values(RoomManager.rooms);
  };

  public static startGame(room_code: string) {
    const room = RoomManager.getRoom(room_code);
  }
}
