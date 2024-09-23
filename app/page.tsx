"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = () => {
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
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="border p-2 rounded-lg w-64 mb-4 text-gray-950 light:text-gray-200"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
