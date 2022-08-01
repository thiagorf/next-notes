import { signIn, signOut, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email}
        <button onClick={() => signOut()}>logout</button>
      </>
    );
  }

  return (
    <>
      Not signed in
      <button onClick={() => signIn()}>login</button>
    </>
  );
}
