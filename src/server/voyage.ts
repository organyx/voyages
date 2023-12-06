import { prisma } from "./db";
import type { UnitType, Vessel, Voyage } from "@prisma/client";

export type VoyageWithVessel = Voyage & { vessel: Vessel } & {
  units: UnitType[];
};

export const getAllVoyages = async (): Promise<VoyageWithVessel[]> => {
  const voyages = await prisma.voyage.findMany({
    include: {
      vessel: true,
      units: true,
    },
  });

  return voyages;
};

export const deleteVoyage = async (id: string): Promise<Voyage> => {
  const deletedVoyage = await prisma.voyage.delete({
    where: {
      id,
    },
  });

  return deletedVoyage;
};

type CreateVoyageSignature = {
  vesselId: string;
  portOfDischarge: string;
  portOfLoading: string;
  scheduledArrival: string;
  scheduledDeparture: string;
  unitTypes: string[];
};

export const createVoyage = async ({
  vesselId,
  portOfDischarge,
  portOfLoading,
  scheduledArrival,
  scheduledDeparture,
  unitTypes,
}: CreateVoyageSignature): Promise<Voyage | null> => {
  try {
    const newVoyage = await prisma.voyage.create({
      data: {
        vesselId,
        portOfDischarge,
        portOfLoading,
        scheduledArrival: new Date(scheduledArrival),
        scheduledDeparture: new Date(scheduledDeparture),
        units: {
          connect: unitTypes.map((unitTypeId: string) => ({
            id: unitTypeId,
          })),
        },
      },
    });
    return newVoyage;
  } catch (e) {
    console.log(e);
    return null;
  }
};
