import { Token } from "@/backend/domain/Token";
import { Loading } from "@/components/loading/loading";
import { useToken } from "@/hooks/useToken";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { push } = useRouter();
  const [, setToken] = useToken();
  const [error, setError] = useState("");

  const handleError = () => {
    setError("login error !!!");
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const login = async () => {
    const { token } = (
      await axios.get<Token>("/api/login", { params: { email, password } })
    ).data;

    return token;
  };

  const handleLogin = async () => {
    try {
      setToken(await login());
      push("/app");
    } catch (error) {
      handleError();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    await handleLogin();
    setLoading(false);
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col">
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        action="submit"
        className="flex flex-col w-52"
      >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          className="pl-2 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="email">Password</label>
        <input
          type="password"
          value={password}
          className="pl-2 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="mt-4 hover:text-pink-500">login</button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
      <Loading isLoading={loading} />
    </main>
  );
}
