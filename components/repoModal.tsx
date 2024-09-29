import React from "react";
import { iRepository } from "@/types/types";

interface RepositoryModalProps {
  repository: iRepository;
  onClose: () => void;
}

const RepositoryModal: React.FC<RepositoryModalProps> = ({
  repository,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-blue-600">{repository.name}</h2>
        <p className="text-gray-600 mt-2">{repository.description}</p>

        {/* Detailed information */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Languages Used:</h3>
          <ul className="list-disc list-inside">
            {repository.languages.map((lang, idx) => (
              <li key={idx} style={{ color: lang.color }}>
                {lang.name} ({lang.size} bytes)
              </li>
            ))}
          </ul>
        </div>

        {repository.licenseInfo && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg">License:</h3>
            <p>{repository.licenseInfo.name}</p>
          </div>
        )}

        <div className="mt-4">
          <h3 className="font-semibold text-lg">Topics:</h3>
          <ul className="list-disc list-inside">
            {repository.repositoryTopics.map((topic, idx) => (
              <li key={idx}>{topic.topicName}</li>
            ))}
          </ul>
        </div>

        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RepositoryModal;
