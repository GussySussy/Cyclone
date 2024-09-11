export class Player {
  public socket_id: string;
  public nickname: string;

  constructor(socket_id: string, nickname: string) {
    this.nickname = nickname;
    this.socket_id = socket_id;
  }
}
