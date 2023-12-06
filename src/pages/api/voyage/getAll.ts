import type { NextApiHandler, NextApiResponse } from "next";
import { type VoyageWithVessel, getAllVoyages } from "~/server/voyage";

const handler: NextApiHandler = async (
  _,
  res: NextApiResponse<VoyageWithVessel[]>
) => {
  const voyages = await getAllVoyages();

  res.status(200).json(voyages);
};

export default handler;
