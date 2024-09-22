type ErrorComponentProps = {
  message: string;
  onRetry: () => void;
};

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message,
  onRetry,
}) => {
  return (
    <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
      <p className="text-lg font-semibold">{message}</p>
      <button
        onClick={onRetry}
        className="bg-white text-red-600 font-bold mt-4 p-2 rounded hover:bg-gray-200 transition-all"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorComponent;
