import { IUser } from "@/backend/domain/User";
import { useEffect, useState } from "react";
import { useToken } from "./useToken";
import axios from "axios";

const useMe = () => {
  const [user, setUser] = useState<IUser | undefined>();

  const [token] = useToken();

  const handleFetchUser = async () => {
    const response = await axios.get<IUser>("/api/me", {
      headers: {
        authorization: token,
      },
    });

    const user = response.data;

    setUser(user);
  };

  useEffect(() => {
    handleFetchUser();
  }, [token]);

  return user;
};

export { useMe };
