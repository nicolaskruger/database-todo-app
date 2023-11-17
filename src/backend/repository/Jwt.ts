import { Token } from "../domain/Token";
import { IUser } from "../domain/User";
import { ITokenRepository } from "./ITokenRepository";
import jwt from "jsonwebtoken";

class Jwt implements ITokenRepository {
  generateToken(user: IUser) {
    return {
      token: "Bearer " + jwt.sign({ ...user }, process.env.JWT_HASH || ""),
    };
  }
  getInfoByToken(token: string) {
    try {
      const user = jwt.verify(
        token.split(" ")[1],
        process.env.JWT_HASH || ""
      ) as IUser;

      return user;
    } catch (e) {
      throw new Error("invalid token");
    }
  }
}

export { Jwt };
