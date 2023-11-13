import { Token } from "../domain/Token";
import { IUser } from "../domain/User";

interface IUserService {
  login: (email: string, password: string) => Promise<Token>;
  signIn: (user: Omit<IUser, "id">) => Promise<Token>;
  tokenToUser: (token: string) => Promise<IUser>;
}

export type { IUserService };
