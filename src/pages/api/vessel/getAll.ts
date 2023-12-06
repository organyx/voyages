import type { Vessel } from "@prisma/client";
import type { NextApiHandler, NextApiResponse } from "next";
import { getAllVessels } from "~/server/vessel";

const handler: NextApiHandler = async (_, res: NextApiResponse<Vessel[]>) => {
  const voyages = await getAllVessels();

  res.status(200).json(voyages);
};

export default handler;
