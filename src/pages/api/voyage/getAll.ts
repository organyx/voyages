import type { NextApiHandler, NextApiResponse } from "next";
import { type VoyageWithVessel, getAllVoyages } from "~/server/voyage";

const handler: NextApiHandler = async (
  _,
  res: NextApiResponse<VoyageWithVessel[] | { message: string }>
) => {
  const voyages = await getAllVoyages();

  if (!voyages) {
    return res.status(500).json({ message: "Error fetching voyages" });
  }

  res.status(200).json(voyages);
};

export default handler;
