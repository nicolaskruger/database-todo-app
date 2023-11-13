import { IIdGeneratorRepository } from "../repository/IIdGenerator";
import { IPasswordValidator } from "../repository/IPasswordValidator";
import { IToDoRepository } from "../repository/IToDoRepository";
import { IUserRepository } from "../repository/IUserRepository";
import { NotSafeIdGenerator } from "../repository/NotSafeIdGenerator";
import { NotSafePasswordValidator } from "../repository/NotSafePasswordValidator";
import { ToDoRepositoryInMemory } from "../repository/ToDoRepositoryInMemory";
import { UserRepositoryIMemory } from "../repository/UserRepositoryInMemory";

const idGeneratorRepository: IIdGeneratorRepository = new NotSafeIdGenerator();
const passwordValidator: IPasswordValidator = new NotSafePasswordValidator();
const todoRepository: IToDoRepository = new ToDoRepositoryInMemory();
const userRepository: IUserRepository = new UserRepositoryIMemory();
