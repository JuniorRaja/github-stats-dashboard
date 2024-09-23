"use client";
import { useContext } from "react";
import { ThemeContext } from "@/app/provider";
import Link from "next/link";
import { PiGithubLogoDuotone } from "react-icons/pi";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-n-6 bg-n-8/90 backdrop-blur-sm ">
      <nav
        className="bg-n-8/90 lg:mx-auto z-auto flex items-center bg-transparent justify-between px-10 py-4 lg:py-0 lg:px-0 
        lg:w-3/4 xl:w-2/3"
      >
        <div className="flex flex-row items-center">
          <PiGithubLogoDuotone
            fontSize={40}
            className={`${
              theme === "dark" ? "text-gray-300 " : "text-gray-800 "
            } `}
          />
          <span className="text-lg ml-2 text-gray-800 dark:text-gray-200">
            Github StatBoard
          </span>
        </div>
        <div className="flex flex-row space-x-4">
          <Link href="/">
            <span
              className="block text-lg text-gray-800 dark:text-gray-200 
          transition-colors hover:text-xl hover:font-bold p-4 lg:p-6 lg:-mr-0.25 z-2 
        :hover:text-gray-800  dark:hover:text-white"
            >
              Home
            </span>
          </Link>
          <Link href="/about">
            <span
              className="block text-lg text-gray-800 dark:text-gray-200 
          transition-colors hover:text-xl hover:font-bold p-4 lg:p-6 lg:-mr-0.25 z-2 
                    :hover:text-gray-800  dark:hover:text-white"
            >
              About
            </span>
          </Link>
        </div>
        <div className="px-10 lg:ml-12">
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            type="button"
            className={`${
              theme === "dark"
                ? "text-gray-300 border-gray-300"
                : "text-gray-800 border-gray-500"
            } border-2 rounded-lg text-sm p-2`}
          >
            <svg
              id="theme-toggle-dark-icon"
              className={`${theme === "light" ? "hidden" : ""} w-5 h-5`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              id="theme-toggle-light-icon"
              className={`${theme === "light" ? "" : "hidden"} w-5 h-5`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
