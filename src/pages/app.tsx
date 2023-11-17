import { useToDo } from "@/hooks/useToDo";

export default function App() {
  const { toDos } = useToDo();
  return (
    <main>
      <h1>App</h1>
      <form action="">
        <input type="text" />
        <button>create</button>
      </form>
      <ul>
        {toDos.map((todo) => {
          return (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.done} />
              <h2>{todo.description}</h2>
              <form action="submit">
                <input type="text" />
                <button>create subToDo</button>
              </form>
              <ul>
                {todo.subToDo.map((subToDo) => {
                  return (
                    <li key={subToDo.id}>
                      <input type="checkbox" checked={subToDo.done} />
                      <h2>{subToDo.description}</h2>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
