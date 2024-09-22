//GQL API end points
import { QUERY_GET_USER_DETAILS } from "@/graphql/query";
import {
  iGitHubUserInfo,
  iGitHubUserStatus,
  iGutHubStatistics,
} from "@/types/types";

// User Status Interface
interface UserStatus {
  emoji: string;
  message: string | null;
  indicatesLimitedAvailability: boolean;
}

// Repository Owner Interface
interface RepositoryOwner {
  login: string;
}

// Repository Interface
interface Repository {
  name: string;
  owner: RepositoryOwner;
}

// Contributions Interface
interface Contributions {
  totalCount: number;
}

// Commit Contributions by Repository Interface
interface CommitContributionsByRepository {
  repository: Repository;
  contributions: Contributions;
}

// Contribution Calendar Interface
interface ContributionCalendar {
  totalContributions: number;
}

// Contributions Collection Interface
interface ContributionsCollection {
  totalCommitContributions: number;
  restrictedContributionsCount: number;
  contributionCalendar: ContributionCalendar;
  commitContributionsByRepository: CommitContributionsByRepository[];
}

// Count Wrapper Interface (Used for Followers, Following, Repositories, Gists, etc.)
interface CountWrapper {
  totalCount: number;
}

// User Interface
export interface User {
  id: string;
  login: string;
  name: string;
  bio: string;
  company: string;
  location: string;
  email: string;
  websiteUrl: string;
  twitterUsername: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  isBountyHunter: boolean;
  isCampusExpert: boolean;
  isDeveloperProgramMember: boolean;
  isEmployee: boolean;
  isHireable: boolean;
  isSiteAdmin: boolean;
  isViewer: boolean;
  status: UserStatus;
  followers: number;
  following: number;
  repositories: number;
  contributionsCollection?: ContributionsCollection;
  gists?: CountWrapper;
  starredRepositories: CountWrapper;
  watching: CountWrapper;
  pullRequests: CountWrapper;
  issues: CountWrapper;
  commitComments: CountWrapper;
}

export const fetchGitHubDetails = async (username: string) =>
  //: Promise<User | null>
  {
    const response = await fetch(process.env.NEXT_PUBLIC_GITHUB_GRAPHQL_API!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: QUERY_GET_USER_DETAILS,
        variables: { username },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("fetchgithubDetails-error: ", data.errors);

      //throw an error or return an error message to the UI.
      throw new Error(
        data.errors[0]?.message ||
          "An error occurred while fetching data from GitHub API."
      );
    } else if (!data || !data.data) {
      console.warn("No data found in the response");
      return null;
    }

    const apiRes = data.data.user;
    console.log("apiRes from fetchGitHubDetails: ", apiRes);
    console.log("rateLimit details: ", data.data.rateLimit);

    //Prepare the result data
    const userStatus: iGitHubUserStatus = {
      emoji: apiRes.status?.emoji?.toString() ?? "",
      message: apiRes.status?.message,
      indicatesLimitedAvailability: apiRes.status?.indicatesLimitedAvailability,
    };

    const userDetails: iGitHubUserInfo = {
      id: apiRes.id,
      login: apiRes.login,
      name: apiRes.name,
      bio: apiRes.bio ?? "",
      company: apiRes.company ?? "",
      location: apiRes.location ?? "",
      email: apiRes.email ?? "",
      websiteUrl: apiRes.websiteUrl ?? "",
      twitterUsername: apiRes.twitterUsername ?? "",
      avatarUrl: apiRes.avatarUrl,
      isBountyHunter: apiRes.isBountyHunter,
      isCampusExpert: apiRes.isCampusExpert,
      isDeveloperProgramMember: apiRes.isDeveloperProgramMember,
      isEmployee: apiRes.isEmployee,
      isHireable: apiRes.isHireable,
      isSiteAdmin: apiRes.isSiteAdmin,
      isViewer: apiRes.isViewer,

      status: apiRes.status && userStatus,
    };

    const userStatistics: iGutHubStatistics = {
      createdAt: apiRes.createdAt
        ? new Date(apiRes.createdAt).toLocaleString("en-US", {
            month: "short",
            year: "2-digit",
          })
        : "",
      updatedAt: apiRes.updatedAt
        ? new Date(apiRes.updatedAt).toLocaleString("en-US", {
            month: "short",
            year: "2-digit",
          })
        : "",
      followers: apiRes.followers.totalCount,
      following: apiRes.following.totalCount,
      //gists: apiRes.gists.totalCount,
      starredRepositories: apiRes.starredRepositories.totalCount,
      watching: apiRes.watching.totalCount,
      pullRequests: apiRes.pullRequests.totalCount,
      issues: apiRes.issues.totalCount,
      commitComments:
        apiRes.contributionsCollection.totalCommitContributions +
        apiRes.contributionsCollection.restrictedContributionsCount,
      repositories: apiRes.repositories.totalCount,
    };

    const outputobj = {
      userDetails,
      userStatistics,
    };

    return outputobj;
  };
