import type { Vessel } from "@prisma/client";
import type { NextApiHandler, NextApiResponse } from "next";
import { getAllVessels } from "~/server/vessel";

const handler: NextApiHandler = async (
  _,
  res: NextApiResponse<Vessel[] | { message: string }>
) => {
  const vessels = await getAllVessels();

  if (!vessels) {
    return res.status(500).json({ message: "Error fetching vessels" });
  }

  res.status(200).json(vessels);
};

export default handler;
