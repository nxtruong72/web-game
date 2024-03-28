import { GameStatus } from './game.enum';

export interface Game {
  id: number;
  name: string;
  teamOne: string;
  teamTwo: string;
  totalBet: number;
  gameTypes: Array<string>;
  streamURL: string;
  planStartTime: Date;
  startTime: Date;
  createdAt: Date;
  gameStatus: GameStatus;
}
