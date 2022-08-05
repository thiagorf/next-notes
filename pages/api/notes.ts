import { NextApiRequest, NextApiResponse } from "next";
import { getNote, getNotes } from "../../services/notes";
import { getToken } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import slugfy from "../../services/slugfy";

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

    const slug = slugfy(body.title);

    const result = await prisma.note.create({
      data: {
        ...body,
        slug,
        user_id: token.sub,
      },
    });

    return res.status(200).json({
      data: result,
      message: "Successfully created a note",
    });
  }

  if (req.method === "GET") {
    if ("slug" in req.query) {
      const note = await getNote(req.body.slug);

      return res.status(200).json({
        data: note,
        message: "",
      });
    }

    const notes = await getNotes(token.sub);

    return res.status(200).json({
      data: notes,
      message: "",
    });
  }
}
