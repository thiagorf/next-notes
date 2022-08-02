function Verify() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-between border border-gray-600 rounded-md p-4 w-[26rem] h-56">
        <h2 className="text-3xl font-semibold text-justify">
          An <span className="text-orange-500">email</span> has been sent to
          your account with a magic link!
        </h2>
        <p className="text-center pb-4">Click on it to finish the login</p>
      </div>
    </div>
  );
}

export default Verify;
