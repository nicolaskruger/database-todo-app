import { SubTodo, ToDo, ToDoView } from "../domain/Todo";

interface IToDoRepository {
  register(todo: ToDo): Promise<void>;
  alter(todo: ToDo): Promise<void>;
  delete(id: string): Promise<void>;
  getFromUser(userId: string): Promise<ToDoView[]>;
  getById(id: string): Promise<ToDo | undefined>;
  addSubToDo(idToDo: string, subToDo: Omit<SubTodo, "id">): Promise<void>;
  deleteSubToDo(idSubTodo: string): Promise<void>;
  alterSubTodo(subToDo: SubTodo): Promise<void>;
  getToDoFromSubTodoId(id: string): Promise<ToDo>;
  registerSubTodo(subToDo: SubTodo): Promise<void>;
}

export type { IToDoRepository };
