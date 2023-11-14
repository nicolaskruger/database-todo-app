import { Bcrypt } from "../repository/Bcrypt";
import { IIdGeneratorRepository } from "../repository/IIdGenerator";
import { IPasswordValidator } from "../repository/IPasswordValidator";
import { IToDoRepository } from "../repository/IToDoRepository";
import { ITokenRepository } from "../repository/ITokenRepository";
import { IUserRepository } from "../repository/IUserRepository";
import { Jwt } from "../repository/Jwt";
import { NotSafeIdGenerator } from "../repository/NotSafeIdGenerator";
import { NotSafePasswordValidator } from "../repository/NotSafePasswordValidator";
import { NotSafeTokenRepository } from "../repository/NotSafeTokenRepository";
import { ToDoRepositoryInMemory } from "../repository/ToDoRepositoryInMemory";
import { UserRepositoryIMemory } from "../repository/UserRepositoryInMemory";
import { UUIDV4 } from "../repository/uuidV4";
import { IUserService } from "../service/IUserService";
import { UserService } from "../service/UserService";

const idGeneratorRepository: IIdGeneratorRepository = new UUIDV4();
const passwordValidator: IPasswordValidator = new Bcrypt();
const tokenRepository: ITokenRepository = new Jwt();
const todoRepository: IToDoRepository = new ToDoRepositoryInMemory();
const userRepository: IUserRepository = new UserRepositoryIMemory();
const userService: IUserService = new UserService(
  userRepository,
  passwordValidator,
  tokenRepository,
  idGeneratorRepository
);

export { userService };
