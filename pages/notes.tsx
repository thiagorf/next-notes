import { Note } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { unstable_getServerSession } from "next-auth";
import prisma from "../lib/prisma";
import getServerRedirectUrl from "../lib/redirect";
import { authOptions } from "./api/auth/[...nextauth]";

interface INotes {
  notes: {
    id: string;
    name: string;
    email: string;
    note: Note[];
  };
}

function Notes({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <div>
        <button>Create a note</button>
      </div>
      {notes.note.length === 0 && (
        <div>
          <p>You don't have any notes right now!</p>
        </div>
      )}
      <div>{JSON.stringify(notes, null, 2)}</div>
    </div>
  );
}

export default Notes;

export const getServerSideProps: GetServerSideProps<INotes> = async (ctx) => {
  const redirect = getServerRedirectUrl(ctx);

  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session) {
    return {
      redirect,
    };
  }

  const notes = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      note: true,
    },
  });

  return {
    props: { notes },
  };
};
