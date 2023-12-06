import { prisma } from "./db";
import type { UnitType, Vessel, Voyage } from "@prisma/client";
import type * as z from "zod";
import { type formSchema } from "~/components/form/createVoyage";

export type VoyageWithVessel = Voyage & { vessel: Vessel } & {
  units: UnitType[];
};

export const getAllVoyages = async (): Promise<VoyageWithVessel[] | null> => {
  try {
    const voyages = await prisma.voyage.findMany({
      include: {
        vessel: true,
        units: true,
      },
    });

    return voyages;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteVoyage = async (id: string): Promise<Voyage | null> => {
  try {
    const deletedVoyage = await prisma.voyage.delete({
      where: {
        id,
      },
    });
    return deletedVoyage;
  } catch (e) {
    console.log(e);
    return null;
  }
};

type CreateVoyageSignature = z.infer<typeof formSchema>;

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
