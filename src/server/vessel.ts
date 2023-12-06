import { type Vessel } from "@prisma/client";
import { prisma } from "./db";

export const getAllVessels = async (): Promise<Vessel[] | null> => {
  try {
    const voyages = await prisma.vessel.findMany();

    return voyages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
