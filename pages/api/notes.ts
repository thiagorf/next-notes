import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prisma";
import { getNotes } from "../../services/notes";
import { getToken } from "next-auth/jwt";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const token = await getToken({ req, secret: "secret" });

  console.log(token);
  console.log(session);

  if (!session) {
    return res.status(401).json({
      message: "You should login first",
      status: 401,
    });
  }

  if (req.method === "POST") {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid or inexisting user",
        status: 404,
      });
    }

    const body: {
      title: string;
      content: string;
    } = req.body;

    const result = await prisma.note.create({
      data: {
        ...body,
        slug: body.title,
        user_id: user.id,
      },
    });

    return res.status(200).json({
      data: result,
      message: "Successfully created a note",
    });
  }

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid or inexisting user",
        status: 404,
      });
    }

    const notes = await getNotes(user.id);

    return res.status(200).json(notes);
  }
}
