import { SubTodo, ToDo, ToDoView } from "../domain/Todo";
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
  async registerSubTodo(subToDo: SubTodo, token: string): Promise<void> {
    await this.validateToDo(subToDo.idToDo, token);
    await this.todoRepository.registerSubTodo(subToDo);
  }

  async validateToDo(idTodo: string, token: string) {
    const toDo = await this.todoRepository.getById(idTodo);
    this.validPermission(toDo as ToDo, token);
  }

  async validateSuTodo(idSubToDo: string, token: string) {
    const toDo = await this.todoRepository.getToDoFromSubTodoId(idSubToDo);
    this.validPermission(toDo as ToDo, token);
  }

  async updateSubTodo(subToDo: SubTodo, token: string): Promise<void> {
    await this.validateSuTodo(subToDo.id, token);
    return await this.todoRepository.alterSubTodo(subToDo);
  }

  private async validPermission(todo: ToDo, token: string): Promise<void> {
    const user = await this.userService.tokenToUser(token);
    const findToDo = await this.todoRepository.getById(todo.id);
    if (user.id !== findToDo?.idUser) throw new Error("unauthorized");
  }

  async register(todo: ToDo, token: string): Promise<void> {
    const user = await this.userService.tokenToUser(token);
    await this.todoRepository.register({
      ...todo,
      idUser: user.id,
      id: this.generateIdRepository.generateId(),
    });
  }
  async alter(todo: ToDo, token: string): Promise<void> {
    const { id } = (await this.todoRepository.getById(todo.id)) as ToDo;
    await this.validPermission(todo, token);
    await this.todoRepository.alter({
      ...todo,
      id,
    });
  }
  async delete(id: string, token: string): Promise<void> {
    const todo = await this.todoRepository.getById(id);
    if (!todo) throw new Error("todo not found");
    await this.validPermission(todo, token);
    await this.todoRepository.delete(id);
  }
  async getFromUser(token: string): Promise<ToDoView[]> {
    const user = await this.userService.tokenToUser(token);
    return await this.todoRepository.getFromUser(user.id);
  }

  async deleteSubTodo(id: string, token: string): Promise<void> {
    await this.validateSuTodo(id, token);
    await this.todoRepository.deleteSubToDo(id);
  }
}

export { TodoService };
