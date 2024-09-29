"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  GitFork,
  Activity,
  Flame,
  Calendar,
  Users,
  UserPlus,
  Book,
  Code,
} from "lucide-react";
import {
  ShieldCheck,
  GraduationCap,
  Briefcase,
  UserCheck,
  Lock,
} from "lucide-react";
import Image from "next/image";
import { fetchGitHubDetails } from "@/lib/githubAPI";
import { FaCodeBranch } from "react-icons/fa";
import { FaTwitter, FaGlobe, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import {
  FaShieldAlt,
  FaGraduationCap,
  FaCode,
  FaBriefcase,
  FaUserCheck,
  FaLock,
  FaEye,
} from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import ErrorComponent from "@/components/error";
import { iUserInfo, iRepository } from "@/types/types";
import { useRouter } from "next/navigation";
import { MultiStepLoader as Loader } from "@/components/multi-step-loader";
import RepositoryList from "./repoList";

const getIconClass = (language: string) => {
  switch (language) {
    case "JavaScript":
      return "devicon-javascript-plain";
    case "Python":
      return "devicon-python-plain";
    case "Java":
      return "devicon-java-plain";
    case "HTML":
      return "devicon-html5-plain";
    case "CSS":
      return "devicon-css3-plain";
    case "SCSS":
      return "devicon-sass-original";
    case "Shell":
      return "devicon-bash-plain";
    default:
      return "";
  }
};

interface iStats {
  id: number;
  labelname: string;
  count: string | number;
  icon: JSX.Element;
}

const CardsComponent = ({ username }: { username: string }) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<iRepository[]>([]);

  const loadingStates = [
    {
      text: "Fetching User Profile Details",
    },
    {
      text: "Gathering Repository Statistics",
    },
    {
      text: "Analyzing Contribution Data",
    },
    {
      text: "Finalizing Stats and Displaying Results",
    },
    {
      text: "Final touches",
    },
  ];

  // State to hold the array of card items
  const [userData, setUserData] = useState<iUserInfo[]>([
    {
      id: "",
      name: "",
      bio: "",
      avatarUrl: "",
      company: "",
      email: "",
      location: "",
      login: "",
      twitterUsername: "",
      websiteUrl: "",
      isBountyHunter: false,
      isCampusExpert: false,
      isDeveloperProgramMember: false,
      isEmployee: false,
      isHireable: false,
      isSiteAdmin: false,
      isViewer: false,
      //status: iGitHubUserStatus unimplemented
    },
  ]);

  const [userStats, setUserStats] = useState<iStats[]>([
    { id: 1, labelname: "Followers", count: 0, icon: <Activity /> },
    { id: 2, labelname: "Following", count: 0, icon: <Flame /> },
    { id: 3, labelname: "Since", count: 0, icon: <Calendar /> },
    { id: 4, labelname: "Last Active", count: 0, icon: <Calendar /> },
  ]);

  const [userDetStats, setUserDetStats] = useState<iStats[]>([
    { id: 1, labelname: "Bounty Hunter", count: 0, icon: <FaShieldAlt /> },
    {
      id: 2,
      labelname: "Campus Expert",
      count: 0,
      icon: <FaGraduationCap />,
    },
    {
      id: 3,
      labelname: "Developer Program",
      count: 0,
      icon: <FaCode />,
    },
    { id: 4, labelname: "Employee", count: 0, icon: <FaBriefcase /> },
    { id: 5, labelname: "Hireable", count: 0, icon: <FaUserCheck /> },
    { id: 6, labelname: "Site Admin", count: 0, icon: <FaLock /> },
    // { id: 7, labelname: "Viewer", count: 0, icon: <FaEye /> },
  ]);

  const [repoStats, setRepoStatsDetailed] = useState<iStats[]>([
    { id: 1, labelname: "Total Repository", count: 0, icon: <Users /> },
    { id: 2, labelname: "Total Commits", count: 0, icon: <GitCommit /> },
    {
      id: 3,
      labelname: "Total PRs",
      count: 0,
      icon: <GitPullRequest />,
    },
    { id: 4, labelname: "Total Issue", count: 0, icon: <AlertCircle /> },
    { id: 5, labelname: "Starred Repos", count: 0, icon: <Star /> },
    { id: 6, labelname: "Watching", count: 0, icon: <Users /> },
  ]);

  console.log("username input : ", username);

  useEffect(() => {
    username && fetchData(username);
  }, [username]);

  const fetchData = async (username: string) => {
    try {
      //Display loader
      setLoading(true);

      const result = await fetchGitHubDetails(username);

      if (result) {
        const userDetails = result.userDetails;
        const userStatistics = result.userStatistics;

        const updatedUserData: iUserInfo[] = [
          {
            id: userDetails.id,
            login: userDetails.login,
            name: userDetails.name,
            bio: userDetails.bio,
            avatarUrl: userDetails.avatarUrl,
            company: "Novac Technology Solutions",
            location: userDetails.location,
            email: "prasanna.r@email.com",
            websiteUrl: "https://pr-dev-portfolio.netlify.app/",
            twitterUsername: "twitterUsername",
            isBountyHunter: true,
            isCampusExpert: true,
            isDeveloperProgramMember: true,
            isEmployee: true,
            isHireable: true,
            isSiteAdmin: true,
            isViewer: true,
          },
        ];

        const updatedUserStats: iStats[] = [
          {
            id: 1,
            labelname: "Followers",
            count: userStatistics.followers,
            icon: <Activity className="w-5 h-5" />,
          },
          {
            id: 2,
            labelname: "Following",
            count: userStatistics.following,
            icon: <Flame className="w-5 h-5" />,
          },
          {
            id: 3,
            labelname: "Since",
            count: userStatistics.createdAt,
            icon: <Calendar className="w-5 h-5" />,
          },
          {
            id: 4,
            labelname: "Last Active",
            count: userStatistics.updatedAt,
            icon: <Calendar className="w-5 h-5" />,
          },
        ];

        const updatedUserDetStats: iStats[] = [
          {
            id: 1,
            labelname: "Bounty Hunter",
            count: userDetails.isBountyHunter ? "Yes" : "No",
            icon: <ShieldCheck className="w-6 h-6" />, // Shield icon for Bounty Hunter
          },
          {
            id: 2,
            labelname: "Campus Expert",
            count: userDetails.isCampusExpert ? "Yes" : "No",
            icon: <GraduationCap className="w-6 h-6" />, // Graduation cap for Campus Expert
          },
          {
            id: 3,
            labelname: "Dev. Program",
            count: userDetails.isDeveloperProgramMember ? "Yes" : "No",
            icon: <Code className="w-6 h-6" />, // Code icon for Developer Program
          },
          {
            id: 4,
            labelname: "Employee",
            count: userDetails.isEmployee ? "Yes" : "No",
            icon: <Briefcase className="w-6 h-6" />, // Briefcase icon for Employee
          },
          {
            id: 5,
            labelname: "Hireable",
            count: userDetails.isHireable ? "Yes" : "No",
            icon: <UserCheck className="w-6 h-6" />, // UserCheck icon for Hireable
          },
          {
            id: 6,
            labelname: "Site Admin",
            count: userDetails.isSiteAdmin ? "Yes" : "No",
            icon: <Lock className="w-6 h-6" />, // Lock icon for Site Admin
          },
        ];

        const updatedRepoStatus: iStats[] = [
          {
            id: 1,
            labelname: "Total Repository",
            icon: <FaBook />, // Book icon to represent repositories
            count: userStatistics.repositories,
          },
          {
            id: 2,
            labelname: "Total Commits",
            icon: <GitCommit />, // Code icon to represent commits
            count: userStatistics.commitComments.toString(),
          },
          {
            id: 3,
            labelname: "Total PRs",
            icon: <FaCodeBranch />, // Branch icon to represent PRs
            count: userStatistics.pullRequests.toString(),
          },
          {
            id: 4,
            labelname: "Total Issues",
            icon: <AlertCircle />, // Bug icon to represent issues
            count: userStatistics.issues.toString(),
          },
          {
            id: 5,
            labelname: "Starred Repos",
            icon: <Star />, // Star icon for starred repositories
            count: userStatistics.starredRepositories.toString(),
          },
          {
            id: 6,
            labelname: "Watching",
            icon: <FaEye />, // Eye icon to represent "Watching"
            count: userStatistics.watching.toString(),
          },
        ];

        const updatedRepos = result.repositories;

        setUserData(updatedUserData);
        setUserStats(updatedUserStats);
        setUserDetStats(updatedUserDetStats);
        setRepoStatsDetailed(updatedRepoStatus);
        setRepos(updatedRepos);
        await simulateLoading();
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      console.error("fetchData -log: Error fetching data", error);
    }
  };

  //a function with 2 seconds timeout to simulate loading
  const simulateLoading = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 3500);
    });
  };

  const handleSearch = async () => {
    try {
      router.push(`/`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      {loading && (
        <div className="w-full h-[60vh] flex items-center justify-center">
          {/* Core Loader Modal */}
          <Loader
            loadingStates={loadingStates}
            loading={loading}
            duration={1100}
          />
        </div>
      )}
      {!loading && (
        <div className="bg-n-8/90 backdrop-blur-sm text-gray-900 dark:text-white p-6 rounded-lg shadow-lg mx-auto">
          {userData && userData[0].name !== "" && (
            <Header
              userData={userData}
              userStats={userStats}
              userDetStats={userDetStats}
            />
          )}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-violet-600 dark:text-violet-400">
              GitHub Stats
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {repoStats.map((stat, index) => (
                <StatItem
                  key={index}
                  icon={stat.icon}
                  label={stat.labelname}
                  value={stat.count}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-violet-600 dark:text-violet-400">
              Repositories
            </h2>
            <RepositoryList repositories={repos} />
          </div>
        </div>
      )}
    </>
  );
};

function Header({
  userData,
  userStats,
  userDetStats,
}: {
  userData: iUserInfo[];
  userStats: iStats[];
  userDetStats: iStats[];
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-7 gap-4 px-3 py-3">
      <div className="col-span-1">
        {/* avatar image */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-solid border-gray-200 dark:border-gray-800 shadow-lg"
          >
            <Image
              src={userData[0].avatarUrl}
              alt={userData[0].name}
              style={{ objectFit: "cover" }}
              width={128}
              height={128}
              priority
            />
          </motion.div>
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-2 text-center">
            @{userData[0].login}
          </div>
          <div className="flex items-center space-x-5 mt-3">
            <a
              href={`mailto:${userData[0].email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              <FaEnvelope
                className="text-gray-500 dark:text-gray-300"
                fontSize={20}
              />
            </a>
            <a
              href={userData[0].websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              <FaGlobe
                className="text-gray-500 dark:text-gray-300"
                fontSize={20}
              />
            </a>
            <a
              href={`https://twitter.com/${userData[0].twitterUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              <FaTwitter className="text-blue-400" fontSize={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        {/* header details */}
        <div className="flex flex-col justify-evenly">
          <div className="flex items-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold mb-2 bg-gradient-to-r from-fuchsia-300 to-blue-500 text-transparent bg-clip-text"
            >
              {userData[0].name}
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-3">
                #{userData[0].id}
              </span>
            </motion.h1>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-700 dark:text-gray-300 mb-4"
            >
              {userData[0].bio}
              {/* icon and value - in smaller text */}
              <div className="flex items-center space-x-2 mt-1">
                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-300" />
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  {userData[0].location}
                </span>
              </div>
            </motion.div>
          </div>
          <div className="flex space-x-4">
            {userStats.map((stat) => (
              <InfoCard
                key={stat.id}
                icon={stat.icon}
                label={stat.labelname}
                value={stat.count}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-row gap-2 flex-wrap">
          {userDetStats.map((stat) => (
            <div
              key={stat.id}
              className={`rounded-md flex items-center py-2 px-2.5 
              border border-transparent text-sm transition-all bg-gray-200 dark:bg-gray-800 shadow-sm w-auto space-x-2`}
            >
              {stat.icon}
              <span className="text-sm text-gray-600 dark:text-gray-300 pr-2">
                {stat.labelname}
              </span>
              <div
                className={`block h-2 w-2 rounded-full ${
                  stat.count === "Yes"
                    ? "bg-green-600 dark:bg-green-800 shadow-glow-green"
                    : "bg-red-600 dark:bg-red-800 shadow-glow-red"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gray-200 dark:bg-gray-900 p-3 rounded-lg flex items-center space-x-2 shadow"
    >
      {icon}
      <div>
        <div className="text-xs text-gray-400 dark:text-gray-300">{label}</div>
        <div className="font-bold text-gray-800  dark:text-white">{value}</div>
      </div>
    </motion.div>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <div>
        <div className="text-sm text-gray-400 dark:text-gray-300">{label}:</div>
        <motion.div
          className="font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.div>
      </div>
    </div>
  );
}

function ContributionCard({
  icon,
  label,
  value,
  sublabel,
  color,
}: {
  icon: React.ReactNode | JSX.Element;
  label: string;
  value: number;
  sublabel: string;
  color: "blue" | "orange" | "green";
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    orange: "from-orange-500 to-orange-600",
    green: "from-green-500 to-green-600",
  };

  return (
    <motion.div
      className={`bg-gradient-to-br ${colorClasses[color]} p-4 rounded-lg shadow-lg`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-2">
        {icon}
        <div className="text-xs font-medium uppercase">{label}</div>
      </div>
      <motion.div
        className="text-4xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {value}
      </motion.div>
      <div className="text-xs opacity-75">{sublabel}</div>
    </motion.div>
  );
}

export default CardsComponent;

// <div className="grid grid-cols-3 gap-6 mb-6">
//         <ContributionCard
//           icon={<Activity className="w-6 h-6 text-blue-400" />}
//           label="Total Contributions"
//           value={stats.totalContributions}
//           sublabel="Mar 30, 2022 - Present"
//           color="blue"
//         />
//         <ContributionCard
//           icon={<Flame className="w-6 h-6 text-orange-400" />}
//           label="Current Streak"
//           value={stats.currentStreak}
//           sublabel="Sep 14"
//           color="orange"
//         />
//         <ContributionCard
//           icon={<Calendar className="w-6 h-6 text-green-400" />}
//           label="Longest Streak"
//           value={stats.longestStreak}
//           sublabel="Apr 7, 2023 - Apr 26, 2023"
//           color="green"
//         />
//       </div>

// <LanguagesUsed languages={stats.languages} />
//<RepositoryList repositories={userData.repositories.nodes} />

// function LanguagesUsed({ languages }: { languages: Language[] }) {
//   return (
//     <div className="bg-gray-800 p-4 rounded-lg mb-6">
//       <h3 className="text-xl font-semibold mb-4 text-green-400">
//         Most Used Languages
//       </h3>
//       <div className="grid grid-cols-3 gap-4">
//         {languages.map((lang, index) => (
//           <motion.div
//             key={lang.name}
//             className="flex flex-col items-center bg-gray-700 p-4 rounded-lg"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <i
//               className={`devicon ${getIconClass(lang.name)} fa-2x`}
//               title={lang.name}
//             ></i>
//             <div className="text-xs text-gray-300 mb-1">{lang.name}</div>
//             <motion.div
//               className="text-2xl font-bold"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 260,
//                 damping: 20,
//                 delay: 0.5 + index * 0.1,
//               }}
//             >
//               {lang.percentage.toFixed(1)}%
//             </motion.div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function RepositoryList({ repositories }: { repositories: Repository[] }) {
//   return (
//     <div className="bg-gray-800 p-4 rounded-lg">
//       <h3 className="text-xl font-semibold mb-4 text-green-400">
//         Top Repositories
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {repositories.map((repo, index) => (
//           <motion.div
//             key={repo.name}
//             className="bg-gray-700 p-4 rounded-lg"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <h4 className="text-lg font-semibold mb-2">{repo.name}</h4>
//             <div className="flex items-center space-x-4 text-sm">
//               <div className="flex items-center">
//                 <Star className="w-4 h-4 mr-1" />
//                 <span>{repo.stargazerCount}</span>
//               </div>
//               <div className="flex items-center">
//                 <GitFork className="w-4 h-4 mr-1" />
//                 <span>{repo.forkCount}</span>
//               </div>
//               {repo.primaryLanguage && (
//                 <div className="flex items-center">
//                   <Code className="w-4 h-4 mr-1" />
//                   <span>{repo.primaryLanguage.name}</span>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
