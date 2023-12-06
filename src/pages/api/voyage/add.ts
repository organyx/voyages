import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
import { createVoyage } from "~/server/voyage";
import { formSchema } from "~/components/form/createVoyage";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const parsedBody = formSchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json(parsedBody.error);
      return;
    }
    const newVoyage = await createVoyage(parsedBody.data);

    newVoyage ? res.status(201) : res.status(404);
    res.end();
    return;
  }

  res.status(405).end();
};

export default handler;
