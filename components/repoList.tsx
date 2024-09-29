import React from "react";
import { iRepository } from "@/types/types";
import RepositoryCard from "./repoCard";

interface RepositoryListProps {
  repositories: iRepository[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.name} repository={repo} />
      ))}
    </div>
  );
};

export default RepositoryList;
