import { ToDo, ToDoView } from "../domain/Todo";

interface IToDoService {
  register(todo: Omit<ToDo, "id">, token: string): Promise<void>;
  alter(todo: Omit<ToDo, "id">, token: string): Promise<void>;
  delete(id: string, token: string): Promise<void>;
  getFromUser(token: string): Promise<ToDoView[]>;
}

export type { IToDoService };
