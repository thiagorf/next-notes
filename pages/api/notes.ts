import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { getNotes } from "../../services/notes";
import { getToken } from "next-auth/jwt";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "You should login first",
      status: 401,
    });
  }

  if (req.method === "POST") {
    const body: {
      title: string;
      content: string;
    } = req.body;

    const result = await prisma.note.create({
      data: {
        ...body,
        slug: body.title,
        user_id: token.sub,
      },
    });

    return res.status(200).json({
      data: result,
      message: "Successfully created a note",
    });
  }

  if (req.method === "GET") {
    const notes = await getNotes(token.sub);

    return res.status(200).json(notes);
  }
}
