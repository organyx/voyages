import type { UnitType, Vessel, Voyage } from "@prisma/client";
import type { NextApiHandler, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export type ReturnType = (Voyage & { vessel: Vessel } & {
  units: UnitType[];
})[];

const handler: NextApiHandler = async (_, res: NextApiResponse<ReturnType>) => {
  const voyages = await prisma.voyage.findMany({
    include: {
      vessel: {},
      units: {},
    },
  });

  res.status(200).json(voyages);
};

export default handler;
