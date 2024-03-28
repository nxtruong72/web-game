import { RoundStatus } from "./round-status.enum";

export interface Round {
    id: number,
    teamWin: number,
    roundStatus: RoundStatus,
    totalBetTeamOne: number,
    totalBetTeamTwo: number,
    totalUserBetTeamOne: number,
    totalUserBetTeamTwo: number,
    createdAt: Date,
    updatedAt: Date,
}
