import { Controller, controller } from "@/backend/controller/controller";
import { userService } from "@/backend/injection/injection";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const get: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization;

  const user = await userService.me(token || "");

  return res.json(user);
};

const control: Controller = {
  GET: get,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await controller(req, res, control);
}
