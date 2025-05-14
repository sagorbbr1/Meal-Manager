import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 text-gray-800 px-6">
      <h1 className="text-7xl font-bold text-emerald-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NoPage;
