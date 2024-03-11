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
  id: string | null;
  name: string | null;
  form: string | null;
  status: string | null;
  startDate: string | null;
  total: string | null;
  profit: string | null;
}
