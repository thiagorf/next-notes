import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
    toast("Check your email for a magic link");
  };

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
