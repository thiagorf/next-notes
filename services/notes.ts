import prisma from "../lib/prisma";

export interface INotes {
  id: string;
  title: string;
  slug: string;
  content: string;
}

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

export const getNote = async (slug: string) => {
  const note = await prisma.note.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
    },
  });

  return note;
};
