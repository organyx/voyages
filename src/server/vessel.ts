import { type Vessel } from "@prisma/client";
import { prisma } from "./db";

export const getAllVessels = async (): Promise<Vessel[]> => {
  const voyages = await prisma.vessel.findMany();

  return voyages;
};
