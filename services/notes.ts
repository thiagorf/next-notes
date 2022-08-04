import prisma from "../lib/prisma";

export const getNotes = async (user_id: string) => {
  const notes = await prisma.note.findMany({
    where: {
      user_id: user_id,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
    },
  });

  return notes;
};
