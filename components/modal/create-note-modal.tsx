import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

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

  return (
    <form>
      <h3>Your Note is about...</h3>
      <div>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            {...register("title", { required: "title is required" })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="content">Title: </label>
          <textarea
            {...register("content", { required: "Content is required" })}
          ></textarea>
          {errors.title && <p>{errors.content.message}</p>}
        </div>
      </div>
      <button>Create Note</button>
    </form>
  );
};
