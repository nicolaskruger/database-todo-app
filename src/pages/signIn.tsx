import { Token } from "@/backend/domain/Token";
import { Loading } from "@/components/loading/loading";
import { useToken } from "@/hooks/useToken";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function SignIn() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [, setToken] = useToken();

  const signIn = async () => {
    const { token } = (
      await axios.post<Token>("/api/signin", {
        name,
        url,
        email,
        password,
      })
    ).data;
    return token;
  };

  const handleError = () => {
    setError("Erro on sign in !!!");
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleSignIn = async () => {
    try {
      setToken(await signIn());
      push("/app");
    } catch (error) {
      handleError();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    await handleSignIn();
    setLoading(false);
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col">
      <h1>Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-52"
        action="submit"
      >
        <label htmlFor="name" id="name">
          name
        </label>
        <input
          value={name}
          className="pl-2 text-black"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email" id="email">
          email
        </label>
        <input
          className="pl-2 text-black"
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" id="password">
          password
        </label>
        <input
          className="pl-2 text-black"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="url" id="url">
          image url
        </label>
        <input
          className="pl-2 text-black"
          value={url}
          type="text"
          onChange={(e) => setUrl(e.target.value)}
        />
        <img
          className="object-contain w-52 h-52 mt-4 mb-4"
          src={
            url ||
            "https://static.wikia.nocookie.net/punpun/images/2/21/Punpun_c1p15.PNG"
          }
          alt="imge perfil"
        />
        <button className="hover:text-pink-500">sign in</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <Loading isLoading={loading} />
    </main>
  );
}
