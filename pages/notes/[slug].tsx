import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getToken } from "next-auth/jwt";
import Head from "next/head";
import { useRouter } from "next/router";
import getServerRedirectUrl from "../../lib/redirect";
import { getNote, INotes } from "../../services/notes";

interface INotePropsData {
  note: INotes;
}

function Note({
  note,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>{note.title}</title>
      </Head>
      {JSON.stringify(note, null, 2)}
    </div>
  );
}

export default Note;

export const getServerSideProps: GetServerSideProps<INotePropsData> = async (
  ctx
) => {
  const token = await getToken({ req: ctx.req });

  if (!token) {
    const redirect = getServerRedirectUrl(ctx);

    return {
      redirect,
    };
  }

  const note = await getNote(ctx.query.slug as string);

  return {
    props: { note },
  };
};
