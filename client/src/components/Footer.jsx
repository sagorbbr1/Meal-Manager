import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-6 border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Meal Manager — Built with 💙 by Sagor
      </div>
    </footer>
  );
};

export default Footer;
