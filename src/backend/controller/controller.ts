import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type Controller = {
  POST?: NextApiHandler;
  GET?: NextApiHandler;
  DELETE?: NextApiHandler;
  UPDATE?: NextApiHandler;
  PATCH?: NextApiHandler;
};

const controller = async (
  req: NextApiRequest,
  res: NextApiResponse,
  control: Controller
) => {
  const ex = control[req.method as keyof Controller];
  if (!ex) return res.status(405).json({ msg: "method not allowed !!!" });
  try {
    return await ex(req, res);
  } catch (error) {
    return res.status(400).json({ msg: (error as Error).message });
  }
};

export { controller };
