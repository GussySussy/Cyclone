// src/utils/SocketManager.ts

import { io, Socket } from "socket.io-client";

enum socket_events {
  JOIN_ROOM = "join_room",
  CREATE_ROOM = "create_room",
  EXIT_ROOM = "exit_room",
}

interface Response<T = any> {
  status: "OK" | "ERROR";
  message?: string;
  data?: T;
}

export class SocketManager {
  private static instance: Socket | null = null;
  private static nickname: string = "";
  private static room_code: string = "";

  constructor() {}

  public static getInstance(): Socket {
    if (!SocketManager.instance) {
      SocketManager.instance = io("http://192.168.29.44:5174");

      SocketManager.instance.on("connect", () => {
        console.log(`Connected with id: ${SocketManager.instance?.id}`);
      });

      SocketManager.instance.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
    return SocketManager.instance;
  }

  public static setNickname(nickname: string) {
    SocketManager.nickname = nickname;
    return SocketManager.nickname;
  }

  public static getNickname() {
    return SocketManager.nickname;
  }

  public static getRoomCode() {
    return SocketManager.room_code;
  }

  public static createRoom = (nickname: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      SocketManager.instance!.emit(
        socket_events.CREATE_ROOM,
        nickname,
        (response: Response) => {
          if (response.status === "OK") {
            SocketManager.room_code = response.data.room_code;
            console.log(response.message);
            resolve(response.data);
          } else {
            reject(new Error(response.message || "Failed to create room"));
          }
        }
      );
    });
  };

  public static joinRoom = (
    nickname: string,
    room_code: string
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      SocketManager.instance!.emit(
        socket_events.JOIN_ROOM,
        nickname,
        room_code,
        (response: Response) => {
          if (response.status === "OK") {
            resolve(response.data);
          } else {
            reject(new Error(response.message || "Failed to join room"));
          }
        }
      );
    });
  };

  public static exitRoom = () => {
    SocketManager.instance!.emit(
      socket_events.EXIT_ROOM,
      SocketManager.room_code,
      (response: Response) => {
        if (response.status === "OK") {
          console.log(response.message);
        } else {
          console.error(response.message);
        }
      }
    );
  };

  public static sendMessage = (message: string) => {};
}
