import { QUERY_GET_USER_DETAILS } from "@/graphql/query";
import {
  iUserInfo,
  iUserStatus,
  iStatistics,
  iRepository,
} from "@/types/types";

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
    const userStatus: iUserStatus = {
      emoji: apiRes.status?.emoji?.toString() ?? "",
      message: apiRes.status?.message,
      indicatesLimitedAvailability: apiRes.status?.indicatesLimitedAvailability,
    };

    const userDetails: iUserInfo = {
      id: apiRes.id,
      login: apiRes.login,
      name: apiRes.name ?? "",
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

    const userStatistics: iStatistics = {
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

    const repositories: iRepository[] = apiRes.repositories.nodes.map(
      (repo: any) => ({
        name: repo.name || "",
        description: repo.description || "No description available",
        url: repo.url || "#",
        isPrivate: repo.isPrivate ?? false,
        isFork: repo.isFork ?? false,
        createdAt: repo.createdAt
          ? new Date(repo.createdAt).toLocaleString("en-US", {
              month: "short",
              year: "2-digit",
            })
          : "",
        updatedAt: repo.updatedAt
          ? new Date(repo.updatedAt).toLocaleString("en-US", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })
          : "",
        pushedAt: repo.pushedAt
          ? new Date(repo.pushedAt).toLocaleString("en-US", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })
          : "",
        stargazerCount: repo.stargazerCount ?? 0,
        forkCount: repo.forkCount ?? 0,
        issuesCount: repo.issues?.totalCount ?? 0,
        pullRequestsCount: repo.pullRequests?.totalCount ?? 0,
        primaryLanguage: {
          name: repo.primaryLanguage?.name || "Unknown",
          color: repo.primaryLanguage?.color || "#000000",
        },
        languages:
          repo.languages?.edges.map((lang: any) => ({
            name: lang?.node?.name || "Unknown",
            color: lang?.node?.color || "#000000",
            size: lang?.size ?? 0,
          })) || [],
        repositoryTopics:
          repo.repositoryTopics?.edges.map((topic: any) => ({
            topicName: topic?.node?.topic?.name || "No Topic",
          })) || [],
        licenseInfo: repo.licenseInfo
          ? {
              name: repo.licenseInfo.name || "No license",
              spdxId: repo.licenseInfo.spdxId || "N/A",
            }
          : null,
      })
    );

    const outputobj = {
      userDetails,
      userStatistics,
      repositories,
    };

    return outputobj;
  };
