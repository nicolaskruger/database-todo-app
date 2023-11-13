interface IPasswordValidator {
  isValid: (inputPassword: string, password: string) => boolean;
}

export type { IPasswordValidator };
