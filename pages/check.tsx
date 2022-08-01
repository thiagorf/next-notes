import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useSession, signOut } from "next-auth/react";

function Check() {
  const { data: session } = useSession();

  if (typeof window === "undefined") return null;
  return (
    <div>
      {session ? <p>You are logged in</p> : <p>You aren't logged in</p>}
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export default Check;

export async function getServerSideProps(ctx) {
  const isLoggedIn = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!isLoggedIn) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
