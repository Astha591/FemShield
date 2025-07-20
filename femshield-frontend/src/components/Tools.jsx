import React from "react";
import NutritionAdvice from "../pages/NutritionAdvice"; 

const Tools = () => {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#ef427c]">Our Tools</h1>
      <p className="mb-4 text-gray-600">
        Here you can find all FemShield tools.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Placeholder for other tools */}
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold">Assessments</h2>
          <p>Check your risk for PCOS, pregnancy complications, and more!</p>
        </div>

        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold">Connect</h2>
          <p>Talk to FemShield Chatbot for medical questions and support!</p>
        </div>

        {/* 🌷 New Nutrition Advice Tool */}
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition col-span-2">
          <h2 className="text-2xl font-bold text-[#ef427c]">Nutrition Advice</h2>
          <p className="mb-3 text-gray-600">Get personalized nutrition and exercise recommendations based on your condition (PCOS, thyroid, pregnancy).</p>
          
          <NutritionAdvice />
        </div>
      </div>
    </div>
  );
};

export default Tools;
