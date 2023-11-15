import { ToDo, ToDoView } from "../domain/Todo";
import { IIdGeneratorRepository } from "../repository/IIdGenerator";
import { IToDoRepository } from "../repository/IToDoRepository";
import { IToDoService } from "./IToDoService";
import { IUserService } from "./IUserService";

class TodoService implements IToDoService {
  private userService: IUserService;
  private todoRepository: IToDoRepository;
  private generateIdRepository: IIdGeneratorRepository;
  constructor(
    userService: IUserService,
    todoRepository: IToDoRepository,
    generateIdRepository: IIdGeneratorRepository
  ) {
    this.userService = userService;
    this.todoRepository = todoRepository;
    this.generateIdRepository = generateIdRepository;
  }

  private async validPermission(todo: ToDo, token: string): Promise<void> {
    const user = await this.userService.tokenToUser(token);
    if (user.id !== todo.idUser) throw new Error("unauthorized");
  }

  async register(todo: ToDo, token: string): Promise<void> {
    this.validPermission(todo, token);
    await this.todoRepository.register({
      ...todo,
      id: this.generateIdRepository.generateId(),
    });
  }
  async alter(todo: ToDo, token: string): Promise<void> {
    this.validPermission(todo, token);
    await this.todoRepository.alter({
      ...todo,
      id: this.generateIdRepository.generateId(),
    });
  }
  async delete(id: string, token: string): Promise<void> {
    const todo = await this.todoRepository.getById(id);
    if (!todo) throw new Error("todo not found");
    this.validPermission(todo, token);
    await this.todoRepository.delete(id);
  }
  async getFromUser(token: string): Promise<ToDoView[]> {
    const user = await this.userService.tokenToUser(token);
    return await this.todoRepository.getFromUser(user.id);
  }
}
