"use client";
import CardComponent from "@/components/github-stats";
import { useContext } from "react";
import { ThemeContext } from "@/app/provider";
import { useSearchParams } from "next/navigation";
const Stats = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "".toString();
  return (
    <div className="max-w-7xl w-full mt-36">
      <div className="min-h-screen flex flex-col items-center">
        {username && <CardComponent username={username} />}
      </div>
    </div>
  );
};

export default Stats;
