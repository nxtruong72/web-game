import { BetStatus } from "./bet-status.enum";

export interface Bet {
    id: number,
    teamBet: number,
    betStatus: BetStatus,
    amount: number,
    createdAt: Date,
    updatedAt: Date,
}
