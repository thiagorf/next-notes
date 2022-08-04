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
