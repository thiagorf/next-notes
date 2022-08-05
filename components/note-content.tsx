import { useRouter } from "next/router";
import { INotes } from "../services/notes";

export const NoteContent = (notes: INotes) => {
  const router = useRouter();
  const handleNoteView = (slug: string) => {
    router.push(`/notes/${slug}`);
  };

  return (
    <div
      className="border border-gray-500 w-56 p-3"
      onClick={() => handleNoteView(notes.slug)}
    >
      <h4 className="text-2xl font-bold">{notes.title}</h4>
      <p>{notes.content}</p>
    </div>
  );
};
