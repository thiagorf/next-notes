import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.method);

    if (req.method === "POST") {
      const hashedPassword = await hash(req.body.password, 10);

      const result = await prisma.user.create({
        data: { ...req.body, password: hashedPassword },
      });

      return res.status(200).json(result);
    }

    if (req.method === "GET") {
      const result = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
