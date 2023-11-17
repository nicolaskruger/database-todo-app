import { Controller, controller } from "@/backend/controller/controller";
import { SubTodo } from "@/backend/domain/Todo";
import { toDoService } from "@/backend/injection/injection";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const post: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization || "";
  const subToDo: SubTodo = req.body;
  await toDoService.registerSubTodo(subToDo, token);
  return res.status(201).json({ msg: "create" });
};

const deleteSubToDo: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization || "";
  const { id } = req.query;
  await toDoService.deleteSubTodo(id as string, token);
  return res.status(200).json({ msg: "deleted" });
};

const update: NextApiHandler = async (req, res) => {
  const token = req.headers.authorization || "";

  const subToDo: SubTodo = req.body;

  await toDoService.updateSubTodo(subToDo, token);

  return res.status(200).json({ msg: "update" });
};

const control: Controller = {
  POST: post,
  DELETE: deleteSubToDo,
  PUT: update,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await controller(req, res, control);
}
