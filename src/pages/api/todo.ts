import { Controller, controller } from "@/backend/controller/controller";
import { ToDo } from "@/backend/domain/Todo";
import { toDoService } from "@/backend/injection/injection";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization || "";
  const response = await toDoService.getFromUser(token);
  return res.json(response);
};

const deletedToDo: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization || "";
  const { id } = req.query;
  await toDoService.delete(id as string, token);
  return res.status(200).json({ msg: "deleted" });
};

const post: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization || "";
  const toDo: ToDo = req.body;
  await toDoService.register(toDo, token);
  return res.status(201).json({ msg: "created" });
};

const update: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization || "";
  const toDo: ToDo = req.body;
  await toDoService.alter(toDo, token);
  return res.status(200).json({ msg: "updated" });
};

const control: Controller = {
  GET: get,
  POST: post,
  DELETE: deletedToDo,
  PUT: update,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await controller(req, res, control);
}
