export const QUERY_GET_USER_DETAILS = `
  query getUserDetails($username: String!) {
  user(login: $username) {
    id
    login
    name
    bio
    company
    location
    email
    websiteUrl
    twitterUsername
    avatarUrl
    createdAt
    updatedAt
    isBountyHunter
    isCampusExpert
    isDeveloperProgramMember
    isEmployee
    isHireable
    isSiteAdmin
    isViewer
    status {
      emoji
      message
      indicatesLimitedAvailability
    }
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories {
      totalCount
    }
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
      contributionCalendar {
        totalContributions
      }
      commitContributionsByRepository {
        repository {
          name
          owner {
            login
          }
        }
        contributions {
          totalCount
        }
      }
    }
    starredRepositories {
      totalCount
    }
    watching {
      totalCount
    }
    pullRequests {
      totalCount
    }
    issues {
      totalCount
    }
    commitComments {
      totalCount
    }
  }
  rateLimit{
    cost
    resetAt
    used
    remaining
    nodeCount
  }
}
  `;

const gql_allFields = `
  {
  user(login: "octocat") {
    id
    login
    name
    bio
    company
    location
    email
    websiteUrl
    twitterUsername
    avatarUrl
    createdAt
    updatedAt
    isBountyHunter
    isCampusExpert
    isDeveloperProgramMember
    isEmployee
    isHireable
    isSiteAdmin
    isViewer
    status {
      emoji
      message
      indicatesLimitedAvailability
    }

    # Followers and Following
    followers {
      totalCount
    }
    following {
      totalCount
    }

    # Repositories
    repositories(first: 10) {
      totalCount
      edges {
        node {
          id
          name
          description
          forkCount
          stargazerCount
          watchers {
            totalCount
          }
          isFork
          isPrivate
          isArchived
          isTemplate
          createdAt
          updatedAt
          pushedAt
          primaryLanguage {
            name
            color
          }
          languages(first: 5) {
            edges {
              node {
                name
                color
              }
              size
            }
          }
          owner {
            login
            url
          }
          issues {
            totalCount
          }
          pullRequests {
            totalCount
          }
          branches {
            totalCount
          }
          tags {
            totalCount
          }
          licenseInfo {
            spdxId
            name
          }
        }
      }
    }

    # Contributions and Commit Stats
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            color
          }
        }
      }
        commitContributionsByRepository {
          repository {
            name
            owner {
              login
            }
          }
          contributions {
            occurredAt
          }
        }
      pullRequestContributionsByRepository {
        repository {
          name
        }
        contributions {
          pullRequest {
            id
            title
            merged
            state
            createdAt
            mergedAt
          }
        }
      }
    }

    # Other User Stats
    gists {
      totalCount
    }
    starredRepositories {
      totalCount
    }
    watching {
      totalCount
    }
    organizations(first: 5) {
      nodes {
        id
        name
        login
        url
        avatarUrl
        description
      }
    }

    # Other Contributions
    pullRequests {
      totalCount
    }
    issues {
      totalCount
    }
    commitComments {
      totalCount
    }
    repositoryDiscussions(first: 5) {
      totalCount
      nodes {
        title
        createdAt
        author {
          login
        }
      }
    }
  }
}

  `;
