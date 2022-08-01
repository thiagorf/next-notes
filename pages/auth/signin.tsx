import { InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ILogin {
  email: string;
}

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const attemptSignIn: SubmitHandler<ILogin> = async (data) => {
    signIn("email", { email: data.email });
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

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
