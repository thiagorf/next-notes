import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getProviders, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

interface ILogin {
  email: string;
}

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const attemptSignIn: SubmitHandler<ILogin> = async (data) => {
    signIn("email", {
      email: data.email,
      callbackUrl: query.callbackUrl as string,
    });
    toast("Wait a moment", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      progressClassName: "bg-orange-500",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (query.callbackUrl) {
    toast.info("You should login first", {
      toastId: "notduplicatedtoast",
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      icon: () => <AiOutlineInfoCircle className="text-orange-500 font-md" />,
      progressClassName: "!bg-orange-500",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  console.log(query.callbackUrl);

  return (
    <div>
      {query.error && <p>{query.error}</p>}
      <form onSubmit={handleSubmit(attemptSignIn)}>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" {...register("email")} />
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>or</p>
        <button
          onClick={() =>
            signIn("github", { callbackUrl: query.callbackUrl as string })
          }
        >
          Sign in with Github
        </button>
        <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
          logout
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const providers = await getProviders();

  const session2 = await getSession();
  console.log("session2: ", session2);
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  console.log("session: ", session);

  return {
    props: {
      providers,
    },
  };
};
