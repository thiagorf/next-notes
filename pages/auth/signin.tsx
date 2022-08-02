import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface IRedirectTo {
  callbackUrl: string;
}

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

  return (
    <div>
      <form onSubmit={handleSubmit(attemptSignIn)}>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" {...register("email")} />
          </div>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
