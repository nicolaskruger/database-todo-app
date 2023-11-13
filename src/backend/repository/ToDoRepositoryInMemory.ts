import { SubTodo, ToDo, ToDoView } from "../domain/Todo";
import { IToDoRepository } from "./IToDoRepository";

let todoList: ToDoView[] = [
  {
    description: "go to kagoshima",
    done: false,
    id: "1",
    idUser: "0",
    subToDo: [],
  },
];

class ToDoRepositoryInMemory implements IToDoRepository {
  addSubToDo(idToDo: string, subToDo: Omit<SubTodo, "id">): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteSubToDo(idSubTodo: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<ToDo | undefined> {
    return todoList.find((todo) => todo.id == id);
  }
  async register(todo: ToDo): Promise<void> {
    todoList.push({ ...todo, subToDo: [] });
  }
  async alter(todo: ToDo): Promise<void> {
    todoList = todoList.map((value) => {
      if (value.id === todo.id) return { ...value, ...todo };
      return value;
    });
  }
  async delete(id: string): Promise<void> {
    todoList = todoList.filter((t) => t.id !== id);
  }
  async getFromUser(userId: string): Promise<ToDoView[]> {
    return todoList.filter((todo) => (todo.idUser = userId));
  }
}

export { ToDoRepositoryInMemory };
