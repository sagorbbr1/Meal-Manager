import React from "react";

const FeatureCard = ({ title, desc, color = "indigo" }) => {
  const borderColor = `border-${color}-500`;
  const iconColor = `text-${color}-600`;

  return (
    <div
      className={`bg-white border-l-4 ${borderColor} p-6 rounded-xl shadow-sm hover:shadow-lg transition`}
    >
      <h4 className={`text-xl font-semibold ${iconColor} mb-2`}>{title}</h4>
      <p className="text-slate-600">{desc}</p>
    </div>
  );
};

export default FeatureCard;
