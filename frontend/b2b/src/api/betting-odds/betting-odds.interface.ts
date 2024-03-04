export interface IBettingOdds {
  content: Array<any>;
  pageable: {
    size: number;
    number: number;
    sort: any;
  };
  totalSize: number;
}
