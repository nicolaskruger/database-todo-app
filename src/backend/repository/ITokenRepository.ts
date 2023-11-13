import { type } from "os";
import { Token } from "../domain/Token";
import { IUser } from "../domain/User";

interface ITokenRepository {
  generateToken: (user: IUser) => Token;
  getInfoByToken: (token: string) => Pick<IUser, "id">;
}

export type { ITokenRepository };
