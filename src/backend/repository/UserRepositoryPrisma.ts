import { IUser } from "../domain/User";
import { IUserRepository } from "./IUserRepository";

import prisma from "../../../lib/prisma";

class UserRepositoryPrisma implements IUserRepository {
  async findUserByEmail(email: string): Promise<IUser | undefined> {
    return await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }
  async registerUser(user: IUser): Promise<void> {
    await prisma.user.create({
      data: {
        ...user,
      },
    });
  }
  async findById(id: string): Promise<IUser | undefined> {
    return await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}

export { UserRepositoryPrisma };
