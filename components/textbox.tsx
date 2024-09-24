import { useState, useEffect, useCallback } from "react";
import { debounce } from "../lib/debounce";

const UsernameInput = () => {
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  // Function to validate the GitHub username using the API
  const validateUsername = useCallback(
    debounce(async (username: string) => {
      try {
        if (!username) return;
        setLoading(true);

        // Using fetch instead of axios
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );

        // Check if the response is 200 (OK)
        setIsValid(response.ok);
      } catch (error) {
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (username) {
      validateUsername(username);
    } else {
      setIsValid(null); // Reset when input is cleared
    }
  }, [username, validateUsername]);

  return (
    <div className="relative mx-auto">
      <input
        type="text"
        className={`border p-2 rounded-lg w-64 mb-4 text-gray-950 light:text-gray-200 ${
          isValid === null
            ? ""
            : isValid
            ? "border-green-500"
            : "border-red-500"
        }`}
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {isValid !== null && !loading && (
        <span
          className={`absolute right-3 text-xl top-2 ${
            isValid ? "text-green-500" : "text-red-500"
          }`}
        >
          {isValid ? "✔️" : "⚠️"}
        </span>
      )}
      {loading && <span className="absolute right-3 top-2">...</span>}
    </div>
  );
};

export default UsernameInput;
