import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import prisma from "../lib/prisma";
import { authOptions } from "./api/auth/[...nextauth]";

function Notes() {
  return <div>{JSON.stringify("asasas", null, 2)}</div>;
}

export default Notes;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session) {
    return {
      props: {},
    };
  }

  const notes = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
};
