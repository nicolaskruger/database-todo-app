import prisma from "../../../lib/prisma";
import { Dictionary } from "../aux/dictionary";
import { ToDo, ToDoView, SubTodo } from "../domain/Todo";
import { IToDoRepository } from "./IToDoRepository";

class ToDoRepositoryPrisma implements IToDoRepository {
  async registerSubTodo(subToDo: SubTodo): Promise<void> {
    await prisma.subToDo.create({
      data: subToDo,
    });
  }
  async getToDoFromSubTodoId(id: string): Promise<ToDo> {
    return await prisma.toDo.findFirstOrThrow({
      where: {
        subTodos: {
          some: {
            id: id,
          },
        },
      },
    });
  }
  async alterSubTodo(subToDo: SubTodo): Promise<void> {
    await prisma.subToDo.update({
      data: {
        ...subToDo,
      },
      where: {
        id: subToDo.id,
      },
    });
  }
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

    const todoList = Object.keys(todoDictionary).map(
      (key) => todoDictionary[key]
    );
    const anotherToDo = (
      await prisma.toDo.findMany({
        include: {
          subTodos: true,
        },
        where: {
          AND: {
            idUser: userId,
            id: {
              notIn: todoList.map((v) => v.id),
            },
          },
        },
      })
    ).map((v) => ({
      ...v,
      subToDo: v.subTodos,
    }));
    return [...anotherToDo, ...todoList];
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
  async deleteSubToDo(idSubTodo: string): Promise<void> {
    await prisma.subToDo.delete({
      where: {
        id: idSubTodo,
      },
    });
  }
}

export { ToDoRepositoryPrisma };
