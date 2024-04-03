export interface IBettingOdds {
  content: Array<IBettingOdds>;
  pageable: {
    size: number;
    number: number;
    sort: any;
  };
  totalSize: number;
}

export interface INewGame {
  name: string;
  teamOne: string;
  teamTwo: string;
  gameTypes: Array<string>;
  streamURL: string;
  planStartTime: string;
}

export interface IBettingOdds {
  id: number | null;
  name: string | null;
  form: string | null;
  status: string | null;
  startDate: string | null;
  total: string | null;
  profit: number | null;
  gameStatus: string | null;
  teamOne: string | null;
  teamTwo: string | null;
  totalBet: number | null;
  gameTypes: Array<string>;
  streamURL: string | null;
  planStartTime: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface IRound {
  id: number;
  teamWin: number;
  roundStatus: string;
  totalBetTeamOne: number;
  totalBetTeamTwo: number;
  profit: number;
  createdAt: string;
  updatedAt: string;
}
