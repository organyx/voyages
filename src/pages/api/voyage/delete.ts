import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
import { deleteVoyage } from "~/server/voyage";
import { randomNetworkError } from "~/utils";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<undefined>
) => {
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id || Array.isArray(id)) {
      res.status(400).end();
      return;
    }
    // randomly fail the delete request
    const maybe = Math.round(Math.random());
    // const maybe = randomNetworkError();
    if (maybe) {
      res.status(400).end();
      return;
    }

    const deletedVoyage = await deleteVoyage(id);

    deletedVoyage ? res.status(204) : res.status(404);
    res.end();
    return;
  }

  res.status(405).end();
};

export default handler;
