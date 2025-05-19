import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = ({ authLoading }) => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-white">
      <ClipLoader
        color="#4ade80"
        loading={authLoading}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
