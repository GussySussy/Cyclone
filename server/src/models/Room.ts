import { RoomManager } from "../managers/RoomManager";
import { Game } from "./Game";
import { Player } from "./Player";

export class Room {
  public room_code: string;
  public players: Player[] = [];
  public game: Game;

  constructor(room_code: string) {
    this.room_code = room_code;
    this.game = new Game(room_code);
  }

  public addPlayer(socket_id: string, nickname: string) {
    const player = new Player(socket_id, nickname);
    this.players.push(player);
  }

  public removePlayer(socket_id: string) {
    this.players = this.players.filter(
      (player) => player.socket_id !== socket_id
    );
    console.log(`User: ${socket_id} has left the room ${this.room_code}`);
    if (this.getTotalPlayers() <= 0) {
      RoomManager.removeRoom(this.room_code);
    }
  }

  public getTotalPlayers() {
    return this.players.length;
  }

  public getPlayers = () => {
    return Object.values(this.players);
  };
}
