import type { UnitType } from "@prisma/client";
import type { NextApiHandler, NextApiResponse } from "next";
import { getAllUnitTypes } from "~/server/unitType";

const handler: NextApiHandler = async (
  _,
  res: NextApiResponse<UnitType[] | { message: string }>
) => {
  const unitTypes = await getAllUnitTypes();

  if (!unitTypes) {
    return res.status(500).json({ message: "Error fetching unit types" });
  }

  res.status(200).json(unitTypes);
};

export default handler;
