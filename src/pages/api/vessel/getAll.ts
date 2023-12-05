import type { Vessel } from "@prisma/client";
import type { NextApiHandler, NextApiResponse } from "next";
import { prisma } from "~/server/db";

type ReturnType = Vessel[];

const handler: NextApiHandler = async (_, res: NextApiResponse<ReturnType>) => {
  const voyages = await prisma.vessel.findMany();

  res.status(200).json(voyages);
};

export default handler;
