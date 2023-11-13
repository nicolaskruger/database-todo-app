import { IPasswordValidator } from "./IPasswordValidator";

class NotSafePasswordValidator implements IPasswordValidator {
  isValid(inputPassword: string, password: string) {
    return inputPassword === password;
  }
}

export { NotSafePasswordValidator };
