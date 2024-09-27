"use client";
interface ButtonProps {
  onClick: () => void;
  buttonText: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, buttonText }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border 
      border-gray-300 bg-[linear-gradient(110deg,#f8f9fa,45%,#e9ecef,55%,#f8f9fa)] bg-[length:200%_100%] 
      px-6 font-medium text-gray-700 transition-colors 
      focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white
      dark:border-slate-800 dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] dark:text-slate-400 
      dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
    >
      {buttonText}
    </button>
  );
};

export default Button;
