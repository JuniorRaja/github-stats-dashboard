"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UsernameInput from "@/components/textbox";

const Home = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    console.log(username);
    if (username) {
      router.push(`/stats?username=${username}`);
    }
  };

  return (
    <>
      <div className="max-w-7xl w-full z-10">
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            GitHub Stats
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            A modern way to visualize your GitHub statistics.
          </p>
          <UsernameInput />

          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-10"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
