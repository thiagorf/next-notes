import type { NextPage } from "next";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Next Notes</title>
      </Head>
      <div className=" min-h-screen">
        <Header />
        <div className="flex flex-col items-center">
          <h1 className="text-6xl w-fit mb-5 font-bold pt-8">
            The best Next.js Notes out there
          </h1>
          <div className="w-7/12 flex justify-between p-8 mb-24">
            <div>
              <p className="w-72 text-lg pb-2">
                Need to wrap up your ideas somewhere? With Next Notes you have
                the total liberty to write, store and delete your personal
                notes!
              </p>

              <p className="text-base font-light">
                And much more...{" "}
                <span className="text-orange-500 font-medium italic">
                  For Free
                </span>
              </p>
            </div>
            <div>
              <p className=" text-xl pb-2">You can:</p>
              <ul className="list-disc list-inside w-fit pl-3">
                {[
                  "Create Notes",
                  "Save then for later",
                  "Delete then anytime",
                ].map((features, index) => (
                  <li className="pb-1" key={index}>
                    <span className="border-b-2 border-orange-300">
                      {features}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button className="w-64 h-8 p-1 bg-orange-500 rounded text-white smooth-shadow ">
            Create your acount right now
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
