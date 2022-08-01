import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import { GetServerSideProps } from "next";

function Check() {
  return (
    <div>
      <p>You are logged in</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </div>
  );
}

export default Check;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fullPathUrl = `${process.env.NEXTAUTH_URL}/${ctx.resolvedUrl}`;

  const isLoggedIn = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!isLoggedIn) {
    return {
      redirect: {
        destination: `/auth/signin?callbackUrl=${encodeURIComponent(
          fullPathUrl
        )}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
