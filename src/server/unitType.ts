import { type UnitType } from "@prisma/client";
import { prisma } from "./db";

export const getAllUnitTypes = async (): Promise<UnitType[]> => {
  const unitTypes = await prisma.unitType.findMany();

  return unitTypes;
};
