import prisma from "../../../lib/prisma";
import { Dictionary } from "../aux/dictionary";
import { ToDo, ToDoView, SubTodo } from "../domain/Todo";
import { IToDoRepository } from "./IToDoRepository";

class ToDoRepositoryPrisma implements IToDoRepository {
  async register(todo: ToDo): Promise<void> {
    await prisma.toDo.create({
      data: {
        ...todo,
      },
    });
  }
  async alter(todo: ToDo): Promise<void> {
    await prisma.toDo.update({
      data: {
        ...todo,
      },
      where: {
        id: todo.id,
      },
    });
  }
  async delete(id: string): Promise<void> {
    await prisma.toDo.delete({
      where: {
        id,
      },
    });
  }
  async getFromUser(userId: string): Promise<ToDoView[]> {
    const toDos = await prisma.viewToDoInfo.findMany({
      where: { idUser: userId },
    });

    const todoDictionary = toDos.reduce((acc, curr) => {
      const subTodo: SubTodo = {
        description: curr.sDescription,
        done: curr.sDone,
        id: curr.idSub,
        idToDo: curr.id,
      };
      const toDoView = acc[curr.id];
      if (!toDoView) {
        const newToDoView: ToDoView = {
          description: curr.description,
          done: curr.done,
          id: curr.id,
          idUser: curr.idUser,
          subToDo: [subTodo],
        };
        return { ...acc, [curr.id]: newToDoView };
      }
      return {
        ...acc,
        [curr.id]: { ...toDoView, subToDo: [...toDoView.subToDo, subTodo] },
      };
    }, {} as Dictionary<string, ToDoView>);

    return Object.keys(todoDictionary).map((key) => todoDictionary[key]);
  }
  async getById(id: string): Promise<ToDo | undefined> {
    return await prisma.toDo.findUniqueOrThrow({ where: { id } });
  }
  async addSubToDo(
    idToDo: string,
    subToDo: Omit<SubTodo, "id">
  ): Promise<void> {
    await prisma.subToDo.create({
      data: {
        ...subToDo,
        idToDo,
      },
    });
  }
  deleteSubToDo(idSubTodo: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
