import { User } from "./User";

export interface Apart extends User {
  aptId: number;
  aptName: string;
  aptAddr: string;
  grade: string;
  money: number;
  users: number;
  cars: number;
}