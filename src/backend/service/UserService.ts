import { Token } from "../domain/Token";
import { IUser } from "../domain/User";
import { IIdGeneratorRepository } from "../repository/IIdGenerator";
import { IPasswordValidator } from "../repository/IPasswordValidator";
import { ITokenRepository } from "../repository/ITokenRepository";
import { IUserRepository } from "../repository/IUserRepository";
import { IUserService } from "./IUserService";

class UserService implements IUserService {
  private userRepository: IUserRepository;
  private passwordValidator: IPasswordValidator;
  private tokenRepository: ITokenRepository;
  private idGeneratorRepository: IIdGeneratorRepository;

  constructor(
    userRepository: IUserRepository,
    passwordValidator: IPasswordValidator,
    tokenRepository: ITokenRepository,
    idGeneratorRepository: IIdGeneratorRepository
  ) {
    this.userRepository = userRepository;
    this.passwordValidator = passwordValidator;
    this.tokenRepository = tokenRepository;
    this.idGeneratorRepository = idGeneratorRepository;
  }
  async tokenToUser(token: string): Promise<IUser> {
    const { id } = this.tokenRepository.getInfoByToken(token);
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("user not found");
    return user;
  }
  async signIn(user: Omit<IUser, "id">) {
    await this.userRepository.registerUser({
      ...user,
      id: this.idGeneratorRepository.generateId(),
    });

    return await this.login(user.email, user.password);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user || this.passwordValidator.isValid(password, user?.password))
      throw new Error("login error !!!");

    return this.tokenRepository.generateToken(user);
  }
}
