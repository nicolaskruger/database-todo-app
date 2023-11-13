import { Token } from "../domain/Token";
import { IUser } from "../domain/User";
import { ITokenRepository } from "./ITokenRepository";

class NotSafeTokenRepository implements ITokenRepository {
  getInfoByToken(token: string) {
    return {
      id: token,
    };
  }
  generateToken(user: IUser) {
    const { id } = user;

    return {
      token: id,
    };
  }
}

export { NotSafeTokenRepository };
