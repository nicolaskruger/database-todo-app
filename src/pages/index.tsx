import { Inter } from "next/font/google";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();
  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col">
      <h1>To do App:</h1>
      <div className="flex space-x-5">
        <button className="hover:text-pink-500" onClick={() => push("signIn")}>
          Sign In
        </button>
        <button className="hover:text-pink-500" onClick={() => push("login")}>
          Login
        </button>
      </div>
    </main>
  );
}
