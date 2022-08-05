import { INotes } from "../services/notes";

export const NoteContent = (notes: INotes) => {
  return (
    <div className="border border-gray-500 w-56 p-3">
      <h4 className="text-2xl font-bold">{notes.title}</h4>
      <p>{notes.content}</p>
    </div>
  );
};
