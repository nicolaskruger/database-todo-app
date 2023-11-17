import { SubTodo, ToDo, ToDoView } from "@/backend/domain/Todo";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useToken } from "./useToken";

const useToDo = () => {
  const [token] = useToken();
  const [toDos, setToDos] = useState<ToDoView[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const index = useRef(
    axios.create({
      headers: {
        authorization: token,
      },
    })
  );

  useEffect(() => {
    index.current = axios.create({
      headers: {
        authorization: token,
      },
    });
  }, [token]);

  const attToDos = async () => {
    const response = await index.current.get<ToDoView[]>("/api/todo");
    setToDos(response.data);
  };

  const createToDo = async (todo: Omit<ToDo, "id" | "idUser">) => {
    setIsLoading(true);
    await index.current.post("/api/todo", todo);
    await attToDos();
    setIsLoading(false);
  };

  const updateToDo = async (todo: ToDo) => {
    setIsLoading(true);
    await index.current.put("/api/todo", todo);
    await attToDos();
    setIsLoading(true);
  };

  const deleteToDo = async (id: string) => {
    setIsLoading(true);
    await index.current.delete("/api/todo", { params: { id } });
    await attToDos();
    setIsLoading(false);
  };

  const createSubToDo = async (subToDo: Omit<SubTodo, "id">) => {
    setIsLoading(true);
    await index.current.post("/api/subtodo", subToDo);
    await attToDos();
    setIsLoading(false);
  };

  const updateSubTodo = async (subToDo: SubTodo) => {
    setIsLoading(true);
    await index.current.put("/api/subtodo", subToDo);
    await attToDos();
    setIsLoading(false);
  };

  const deleteSubToDo = async (id: string) => {
    setIsLoading(true);
    await index.current.delete("/api/subtoo", { params: { id } });
    await attToDos();
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      attToDos();
      setIsLoading(false);
    })();
  }, []);

  return {
    isLoading,
    toDos,
    createSubToDo,
    createToDo,
    deleteSubToDo,
    deleteToDo,
    updateSubTodo,
    updateToDo,
  };
};

export { useToDo };
