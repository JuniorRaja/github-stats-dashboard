"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UsernameInput from "@/components/textbox";
import Button from "@/components/button";

const Home = () => {
  const [inputStr, setInputStr] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    if (inputStr) {
      router.push(`/stats?username=${inputStr}`);
    }
  };

  return (
    <>
      <div className="max-w-7xl w-full z-10 ">
        <div className="min-h-screen flex flex-col items-center justify-center bg-n-8/90 backdrop-blur-sm">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            GitHub Stats
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            A modern UI to visualize your GitHub statistics.
          </p>
          <UsernameInput value={inputStr} onChange={setInputStr} />

          <Button onClick={handleSearch} buttonText="Get Stats" />
        </div>
      </div>
    </>
  );
};

export default Home;
