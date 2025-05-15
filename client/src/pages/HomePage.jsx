import React, { useEffect } from "react";
import FeatureCard from "../components/FeatureCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const HomePage = () => {
  const { user, authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard");
    }
  }, [authLoading, user, navigate]);

  if (authLoading) {
    return <p className="text-center mt-10">Loading...</p>; // show nothing until auth check finishes
  }

  return (
    <div className="bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-4">
            Manage Your Mess Like a Pro
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Track meals, expenses, and members — all in one place.
          </p>
          <Link
            to="/login"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-emerald-700 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Core Features
          </h3>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              color="teal"
              title="Meal & Expense Tracking"
              desc="Add meals, expenses, and deposits. Let us handle the math."
            />
            <FeatureCard
              color="teal"
              title="Smart Member Management"
              desc="Add or remove members, assign managers — all in one click."
            />
            <FeatureCard
              color="teal"
              title="PDF Reports"
              desc="Download monthly summaries and stay organized like a boss."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
