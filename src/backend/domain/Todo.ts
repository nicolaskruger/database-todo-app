import { type } from "os";

type ToDo = {
  id: string;
  description: string;
  done: boolean;
  idUser: string;
};

type SubTodo = {
  id: string;
  description: string;
  idToDo: string;
  done: boolean;
};

type ToDoView = ToDo & {
  subToDo: SubTodo[];
};

export type { ToDo, SubTodo, ToDoView };
