import React from "react";
import HeaderNav from "../components/HeaderNav";

const HowToUse = () => {
  return (
    <>
      <HeaderNav />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-emerald-700 text-center">
          📘 How to Use Meal Manager
        </h1>

        <Step
          number={1}
          title="Create or Join a Mess"
          description="Start by creating a new mess if you're the manager, or join an existing one with a provided invite link."
        />

        <Step
          number={2}
          title="Add Members"
          description="Once the mess is created, invite your roommates or mess members to join."
        />

        <Step
          number={3}
          title="Add Meals Daily"
          description="Each member logs how many meals they had daily. This helps calculate total meals consumed."
        />

        <Step
          number={4}
          title="Add Expenses (Bajaar Cost)"
          description="Add mess expenses like groceries and essentials. This is shared among members based on meal count."
        />

        <Step
          number={5}
          title="Track Deposits"
          description="Each member can deposit money into their mess account. This is used to pay for meals."
        />

        <Step
          number={6}
          title="See Calculations"
          description="Meal Rate = Total Expense ÷ Total Meals. Each member's meal cost is calculated based on their meals."
        />

        <Step
          number={7}
          title="Check Balance"
          description="Balance = Deposit - Meal Cost. See who needs to pay more or who has extra credit."
        />

        <Step
          number={8}
          title="Enjoy Peace ✌️"
          description="No more fights over who paid what or ate more. Everything’s transparent and fair."
        />
      </div>
    </>
  );
};

const Step = ({ number, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
      {number}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-emerald-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default HowToUse;
