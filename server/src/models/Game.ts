import { RoomManager } from "../managers/RoomManager";
import { Player } from "./Player";
import { Room } from "./Room";

interface Submission {
  player_id: string;
  submission: string;
}

interface Score {
  player_id: string;
  score: number;
}

export class Game {
  public room: Room;
  public players: Player[];
  public currentQuestion: { question: string; answer: string } | null;
  public answers: Submission[];
  public round: number;
  public isActive: boolean;
  public votes: Submission[];
  public scores: { [player_id: string]: number };
  public waiting: Player[];
  public result: { [player_id: string]: string };

  constructor(room_code: string) {
    this.room = RoomManager.getRoom(room_code)!;
    this.players = [];
    this.currentQuestion = null;
    this.answers = [];
    this.round = 0;
    this.votes = [];
    this.scores = {};
    this.waiting = [];
    this.result = {};
    this.isActive = false;
  }

  public startGame = () => {
    this.isActive = true;
    this.players = this.room.getPlayers();
  };

  public startRound = () => {
    this.round++;
    this.players.concat(this.waiting);
    this.answers = [];
    this.votes = [];
    this.result = {};
  };

  public submitAnswer(player_id: string, answer: string) {
    this.answers.push({ player_id, submission: answer });
    if (this.answers.length == this.players.length) {
      return "vote";
    }
  }

  public submitVote = (player_id: string, vote: string) => {
    this.votes.push({ player_id, submission: vote });
    if (this.votes.length == this.players.length) {
      return "vote";
    }
  };

  public endRound = () => {};

  public calculateScore = () => {
    this.players.forEach((player) => {
      const player_id = player.socket_id;
      const vote = this.votes.find((vote) => (vote.player_id = player_id));
      if (vote) {
        if (vote.submission == this.currentQuestion!.answer) {
          this.result[player_id] = "correct";
          this.scores[player_id] += 2;
        } else {
          const answer = this.answers.find(
            (answer) => vote.submission == answer.submission
          );
          if (answer) {
            this.scores[answer.player_id] += 1;
            this.result[player_id] = answer.player_id;
          }
        }
      }
    });
  };
}
