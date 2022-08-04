import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ICreateNotes {
  title: string;
  content: string;
}

export const CreateNoteModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateNotes>();
  const {
    data: { user },
  } = useSession();

  const attemptCreateNote: SubmitHandler<ICreateNotes> = (data) => {
    console.log(data);
    const requiredData = { ...data, email: user.email };
    console.log(requiredData);
  };

  return (
    <form
      onSubmit={handleSubmit(attemptCreateNote)}
      className="flex flex-col border border-gray-400 p-4 w-96 rounded-md"
    >
      <h3 className="text-3xl font-bold text-gray-800">
        Your Note is about...
      </h3>
      <div>
        <div className="flex flex-col py-2">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            {...register("title", { required: "title is required" })}
            className={`h-8  outline-none border border-gray-400 pl-2 ${
              errors.title && "!border-red-500"
            } `}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col pb-2">
          <label htmlFor="content">Content: </label>
          <textarea
            {...register("content", { required: "content is required" })}
            className={`outline-none border border-gray-400 resize-none scroll-smooth h-full min-h-[15rem] pl-2 pt-1 ${
              errors.content && "!border-red-500"
            }`}
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className=" h-8 bg-orange-500 text-white font-semibold transition-all hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500"
      >
        Create Note
      </button>
    </form>
  );
};
