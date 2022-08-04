import { Note } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { unstable_getServerSession } from "next-auth";
import { useState } from "react";
import { Modal } from "../components/modal";
import { CreateNoteModal } from "../components/modal/create-note-modal";
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

interface IRealNotes {
  notes: {
    id: string;
    title: string;
    slug: string;
    content: string;
  }[];
}

function Notes({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setShow(true)}>Create a note</button>
        <Modal
          show={show}
          onClose={() => setShow(false)}
          Content={CreateNoteModal}
        />
      </div>
      {notes.length === 0 && (
        <div>
          <p>You don't have any notes right now!</p>
        </div>
      )}
      <div>{JSON.stringify(notes, null, 2)}</div>
    </div>
  );
}

export default Notes;

export const getServerSideProps: GetServerSideProps<IRealNotes> = async (
  ctx
) => {
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

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  const notes = await prisma.note.findMany({
    where: {
      user_id: user.id,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
    },
  });

  return {
    props: { notes },
  };
};
