import React, { useState } from "react";
import { iRepository } from "@/types/types";
import RepositoryModal from "./repoModal";

interface RepositoryCardProps {
  repository: iRepository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="p-4 rounded-lg shadow-md bg-gray-200 dark:bg-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {repository.name}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {repository.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {repository.isPrivate ? "Private" : "Public"}
          </span>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Forks: {repository.forkCount}
          </span>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Stars: {repository.stargazerCount}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {`</> ${repository.primaryLanguage.name}`}
            </span>
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: repository.primaryLanguage.color }}
            />
          </div>
        </div>

        <a
          href={repository.url}
          target="_blank"
          className="mt-4 inline-block text-blue-500 dark:text-blue-300 hover:underline"
        >
          View Repository
        </a>
      </div>

      {/* Modal for detailed view */}
      {isModalOpen && (
        <RepositoryModal
          repository={repository}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default RepositoryCard;
