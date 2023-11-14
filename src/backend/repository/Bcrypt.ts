import { IPasswordValidator } from "./IPasswordValidator";
import bcrypt from "bcrypt";

class Bcrypt implements IPasswordValidator {
  generate(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  isValid(inputPassword: string, password: string) {
    return bcrypt.compareSync(inputPassword, password);
  }
}

export { Bcrypt };
