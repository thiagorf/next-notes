import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

interface ILogin {
  email: string;
}

export default function SignIn() {
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

  /*
    TODO don't show toast on sign in error
  */
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
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: ctx.resolvedUrl,
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
