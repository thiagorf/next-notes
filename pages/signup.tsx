import { SubmitHandler, useForm } from "react-hook-form";

interface ICreateAccount {
  name: string;
  email: string;
  password: string;
}

type InputFieldsTypes = {
  labelPlaceholder: string;
  refersTo: string;
  inputType: string;
};

type InputNames = keyof ICreateAccount;

const inputFields: InputFieldsTypes[] = [
  {
    labelPlaceholder: "Name:",
    refersTo: "name",
    inputType: "text",
  },
  {
    labelPlaceholder: "Email:",
    refersTo: "email",
    inputType: "text",
  },
  {
    labelPlaceholder: "Password:",
    refersTo: "password",
    inputType: "password",
  },
];

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAccount>();

  const attemptCreateAccount: SubmitHandler<ICreateAccount> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <form
        onSubmit={handleSubmit(attemptCreateAccount)}
        className="flex flex-col justify-between border border-gray-700 rounded-md w-80 h-[18rem] p-2"
      >
        <div>
          {inputFields.map(
            ({ labelPlaceholder, refersTo, inputType }, index) => (
              <div key={index} className="flex flex-col p-1">
                <label htmlFor={refersTo}>{labelPlaceholder} </label>
                <input
                  type={inputType}
                  id={refersTo}
                  {...register(refersTo as InputNames, {
                    required: "This field is required",
                  })}
                  className="border border-gray-600 rounded pl-2"
                />
                {errors[refersTo] && <p>{errors[refersTo].message}</p>}
              </div>
            )
          )}
          <a href="" className="text-xs font-normal p-1">
            Already have an account?{" "}
            <span className="font-bold text-orange-500">sign-in</span>
          </a>
        </div>
        <button
          type="submit"
          className="justify-self-end  h-8 bg-orange-500 text-white m-1"
        >
          Create
        </button>
      </form>
    </div>
  );
}
