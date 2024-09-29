export interface iUserStatus {
  emoji: string;
  message: string | null;
  indicatesLimitedAvailability: boolean;
}

export interface iUserInfo {
  id: string;
  login: string;
  name: string;
  bio: string;
  avatarUrl: string;
  company: string;
  location: string;
  email: string;
  websiteUrl: string;
  twitterUsername: string;
  isBountyHunter: boolean;
  isCampusExpert: boolean;
  isDeveloperProgramMember: boolean;
  isEmployee: boolean;
  isHireable: boolean;
  isSiteAdmin: boolean;
  isViewer: boolean;
  status?: iUserStatus;
}

export interface iStatistics {
  createdAt: string;
  updatedAt: string;
  followers: number;
  following: number;
  repositories: number;
  gists?: number;
  starredRepositories: number;
  watching: number;
  pullRequests: number;
  issues: number;
  commitComments: number;
}

export interface iRepository {
  name: string;
  description: string;
  url: string;
  isPrivate: boolean;
  isFork: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  stargazerCount: number;
  forkCount: number;
  issuesCount: number;
  pullRequestsCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  };
  languages: Array<{
    name: string;
    color: string;
    size: number;
  }>;
  repositoryTopics: Array<{
    topicName: string;
  }>;
  licenseInfo: {
    name: string;
    spdxId: string;
  } | null;
}
