import type { Vessel, Voyage } from "@prisma/client";
import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
import { prisma } from "~/server/db";

export type ReturnType = Voyage & { vessel: Vessel };

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const {
      vesselId,
      scheduledDeparture,
      scheduledArrival,
      portOfLoading,
      portOfDischarge,
      unitTypes,
    } = req.body;

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

    newVoyage ? res.status(201) : res.status(404);
    res.end();
    return;
  }

  res.status(405).end();
};

export default handler;
