import type { UnitType } from "@prisma/client";
import type { NextApiHandler, NextApiResponse } from "next";
import { getAllUnitTypes } from "~/server/unitType";

const handler: NextApiHandler = async (_, res: NextApiResponse<UnitType[]>) => {
  const unitTypes = await getAllUnitTypes();

  res.status(200).json(unitTypes);
};

export default handler;
