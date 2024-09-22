const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        About This App
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        This app is built using Next.js, Tailwind CSS, TypeScript, and Apollo
        Client to fetch data from the GitHub GraphQL API.
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        It's a modern and responsive web app with support for light and dark
        mode, built to visualize GitHub statistics in a user-friendly way.
      </p>
    </div>
  );
};

export default About;
