import { IUser } from "../domain/User";
import { IUserRepository } from "./IUserRepository";

const userList: IUser[] = [
  {
    email: "aiko@email",
    id: "0",
    name: "Aiko",
    password: "123",
    url: "https://static.wikia.nocookie.net/punpun/images/c/c0/Aiko_c145p4.PNG/revision/latest?cb=20150330012445",
  },
  {
    email: "punpun@email",
    id: "1",
    name: "Punpun",
    password: "123",
    url: "https://static.wikia.nocookie.net/punpun/images/1/15/Punpun_c1p2.PNG/revision/latest?cb=20150406130815",
  },
];

class UserRepositoryIMemory implements IUserRepository {
  async findById(id: string): Promise<IUser | undefined> {
    return userList.find((user) => user.id === id);
  }
  async registerUser(user: IUser) {
    userList.push(user);
  }
  async findUserByEmail(email: string) {
    return userList.find((user) => user.email === email);
  }
}

export { UserRepositoryIMemory };
