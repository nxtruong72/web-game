export interface IBettingOdds {
  content: Array<BettingOdds>;
  pageable: {
    size: number;
    number: number;
    sort: any;
  };
  totalSize: number;
}

interface BettingOdds {
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
