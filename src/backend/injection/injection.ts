import { Bcrypt } from "../repository/Bcrypt";
import { IIdGeneratorRepository } from "../repository/IIdGenerator";
import { IPasswordValidator } from "../repository/IPasswordValidator";
import { IToDoRepository } from "../repository/IToDoRepository";
import { ITokenRepository } from "../repository/ITokenRepository";
import { IUserRepository } from "../repository/IUserRepository";
import { Jwt } from "../repository/Jwt";
import { ToDoRepositoryPrisma } from "../repository/ToDoRepositoryPrisma";
import { UserRepositoryPrisma } from "../repository/UserRepositoryPrisma";
import { UUIDV4 } from "../repository/uuidV4";
import { IUserService } from "../service/IUserService";
import { UserService } from "../service/UserService";

const idGeneratorRepository: IIdGeneratorRepository = new UUIDV4();
const passwordValidator: IPasswordValidator = new Bcrypt();
const tokenRepository: ITokenRepository = new Jwt();
const todoRepository: IToDoRepository = new ToDoRepositoryPrisma();
const userRepository: IUserRepository = new UserRepositoryPrisma();
const userService: IUserService = new UserService(
  userRepository,
  passwordValidator,
  tokenRepository,
  idGeneratorRepository
);

export { userService };
