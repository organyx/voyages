import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
import { createVoyage } from "~/server/voyage";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const newVoyage = await createVoyage(req.body);

    newVoyage ? res.status(201) : res.status(404);
    res.end();
    return;
  }

  res.status(405).end();
};

export default handler;
