import { IUser } from "../domain/User";

interface IUserRepository {
  findUserByEmail: (email: string) => Promise<IUser | undefined>;
  registerUser: (user: IUser) => Promise<void>;
  findById: (id: string) => Promise<IUser | undefined>;
}

export type { IUserRepository };
