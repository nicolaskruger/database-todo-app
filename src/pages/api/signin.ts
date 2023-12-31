import { Controller, controller } from "@/backend/controller/controller";
import { Token } from "@/backend/domain/Token";
import { IUser } from "@/backend/domain/User";
import { userService } from "@/backend/injection/injection";
import { NextApiRequest, NextApiResponse } from "next";

const post = async (req: NextApiRequest, res: NextApiResponse<Token>) => {
  const user: IUser = req.body;
  const token = await userService.signIn(user);
  return res.status(200).json(token);
};

const control: Controller = {
  POST: post,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Token>
) {
  await controller(req, res, control);
}
