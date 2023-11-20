import { SubTodo, ToDo } from "@/backend/domain/Todo";
import { Loading } from "@/components/loading/loading";
import { UserHeader } from "@/components/user-header/user-header";
import { useMe } from "@/hooks/useMe";
import { useToDo } from "@/hooks/useToDo";
import { FormEvent, useState } from "react";

export default function App() {
  const {
    toDos,
    createToDo,
    isLoading,
    updateToDo,
    deleteToDo,
    createSubToDo,
    updateSubTodo,
    deleteSubToDo,
  } = useToDo();

  const [descriptionToDo, setDescriptionToDo] = useState("");
  const [descriptionSubToDo, setDescriptionSubToDo] = useState("");

  const user = useMe();

  const handleToggleToDo = async (toDo: ToDo) => {
    await updateToDo({
      description: toDo.description,
      done: !toDo.done,
      id: toDo.id,
      idUser: toDo.idUser,
    });
  };

  const handleCreteToDo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!descriptionToDo) return;
    await createToDo({ description: descriptionToDo, done: false });
    setDescriptionToDo("");
  };

  const handleDeleteToDo = async (id: string) => {
    await deleteToDo(id);
  };

  const handleCreateSubToDo = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!descriptionSubToDo) return;
    await createSubToDo({
      done: false,
      description: descriptionSubToDo,
      idToDo: id,
    });
    setDescriptionSubToDo("");
  };

  const handleCheckSubToDo = async (subToDo: SubTodo) => {
    await updateSubTodo({ ...subToDo, done: !subToDo.done });
  };

  const handleDeleteSubToDo = async (id: string) => {
    await deleteSubToDo(id);
  };

  return (
    <main className=" my-0 mx-auto xl:w-[1000px] mt-7 w-9/12">
      <UserHeader user={user} />
      <form
        className="flex flex-col"
        onSubmit={handleCreteToDo}
        action="submit"
      >
        <textarea
          className="text-black pl-2 h-24"
          value={descriptionToDo}
          onChange={(e) => setDescriptionToDo(e.target.value)}
        />
        <button className="hover:bg-green-800 transition-colors duration-300">
          create
        </button>
      </form>
      <ul>
        {toDos.map((todo) => {
          return (
            <li className="flex flex-col" key={todo.id}>
              <div className="flex h-14 items-center gap-3">
                <input
                  onClick={() => handleToggleToDo(todo)}
                  type="checkbox"
                  checked={todo.done}
                />
                <h2>{todo.description}</h2>
                <button
                  onClick={() => handleDeleteToDo(todo.id)}
                  className="text-red-600"
                >
                  delete
                </button>
              </div>
              <form
                className="pl-4 flex gap-4"
                action="submit"
                onSubmit={(e) => handleCreateSubToDo(e, todo.id)}
              >
                <input
                  value={descriptionSubToDo}
                  onChange={(e) => setDescriptionSubToDo(e.target.value)}
                  className="pl-2 w-72 text-black"
                  type="text"
                />
                <button className=" text-green-600">create subToDo</button>
              </form>
              <ul className="pl-4 mt-4">
                {todo.subToDo.map((subToDo) => {
                  return (
                    <li className="flex gap-3" key={subToDo.id}>
                      <input
                        onClick={() => handleCheckSubToDo(subToDo)}
                        type="checkbox"
                        checked={subToDo.done}
                      />
                      <h2>{subToDo.description}</h2>
                      <button
                        onClick={() => handleDeleteSubToDo(subToDo.id)}
                        className="text-red-600"
                      >
                        delete
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <Loading isLoading={isLoading || !user} />
    </main>
  );
}
