interface IPasswordValidator {
  isValid: (inputPassword: string, password: string) => boolean;
  generate(password: string): string;
}

export type { IPasswordValidator };
