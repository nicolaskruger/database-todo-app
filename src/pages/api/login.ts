import { Controller, controller } from "@/backend/controller/controller";
import { Token } from "@/backend/domain/Token";
import { IUser } from "@/backend/domain/User";
import { userService } from "@/backend/injection/injection";
import { NextApiRequest, NextApiResponse } from "next";

const get = async (req: NextApiRequest, res: NextApiResponse<Token>) => {
  const { email, password } = req.query as Pick<IUser, "email" | "password">;
  const token = await userService.login(email, password);
  return res.status(200).json(token);
};

const control: Controller = {
  GET: get,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Token>
) {
  await controller(req, res, control);
}
