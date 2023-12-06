import { type UnitType } from "@prisma/client";
import { prisma } from "./db";

export const getAllUnitTypes = async (): Promise<UnitType[] | null> => {
  try {
    const unitTypes = await prisma.unitType.findMany();

    return unitTypes;
  } catch (error) {
    console.log(error);
    return null;
  }
};
