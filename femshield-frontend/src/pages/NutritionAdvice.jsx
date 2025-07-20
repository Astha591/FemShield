import React, { useState } from "react";

const NutritionAdvice = () => {
  const [condition, setCondition] = useState("");
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/nutrition", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ condition })
      });
      if (!response.ok) {
        throw new Error("Condition not found");
      }
      const data = await response.json();
      setAdvice(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setAdvice(null);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-[#ef427c]">Nutrition Advice</h2>
      <input
        type="text"
        placeholder="Enter condition (pcos, thyroid, pregnancy)..."
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        className="border rounded p-2 mt-3 w-full"
      />
      <button
        onClick={fetchAdvice}
        className="bg-[#ef427c] hover:bg-[#d93a6e] text-white rounded p-2 mt-3 w-full"
      >
        Get Advice
      </button>

      {error && <div className="text-red-500 mt-3">{error}</div>}

      {advice && (
        <div className="mt-4 p-3 rounded border">
          <h3 className="font-bold">Diet Advice:</h3>
          <ul className="list-disc list-inside">
            {advice.diet?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <h3 className="font-bold mt-3">Exercise Advice:</h3>
          <ul className="list-disc list-inside">
            {advice.exercise?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NutritionAdvice;
