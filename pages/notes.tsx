import { CreateNoteModal } from "../components/modal/create-note-modal";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import getServerRedirectUrl from "../lib/redirect";
import { getNotes } from "../services/notes";
import { Modal } from "../components/modal";
import { getToken } from "next-auth/jwt";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { NoteContent } from "../components/note-content";

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
      <div className="p-2">
        <button
          onClick={() => setShow(true)}
          className="border border-gray-500 p-2 w-48 rounded-full flex justify-center items-center gap-1"
        >
          <span>Create a note</span>
          <AiOutlinePlus />
        </button>
        <Modal
          show={show}
          onClose={() => setShow(false)}
          Content={CreateNoteModal}
        />
      </div>
      {notes.length === 0 ? (
        <div>
          <p>You don't have any notes right now!</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 p-2">
          {notes.map((note) => (
            <NoteContent {...note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;

export const getServerSideProps: GetServerSideProps<IRealNotes> = async (
  ctx
) => {
  const token = await getToken({ req: ctx.req });

  if (!token) {
    const redirect = getServerRedirectUrl(ctx);
    return {
      redirect,
    };
  }

  const notes = await getNotes(token.sub);

  return {
    props: { notes },
  };
};
