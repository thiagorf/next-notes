export const Header = () => {
  return (
    <header className="flex justify-between items-center h-24 mx-12">
      <h2 className="text-2xl">Next-Notes</h2>
      <button className="w-36 text-orange-500 border border-slate-600 rounded-full hover:bg-orange-500 hover:text-white hover:border-none transition-all">
        Create Account
      </button>
    </header>
  );
};
