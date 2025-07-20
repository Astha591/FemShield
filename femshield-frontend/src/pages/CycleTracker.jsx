import { useState } from "react";
import girl from "../assets/images/girl.png"
export default function CycleTracker() {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/cycle_tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          last_period_date: lastPeriodDate,
          cycle_length: cycleLength,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setResults(data);
        setError(null);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Unable to connect to the server");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-6">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg space-y-4">
        <h1 className="text-2xl font-bold text-center text-pink-600">Cycle Tracking</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          
          <div>
            <label className="block text-gray-700">Last Period Date</label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              required
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700">Cycle Length (days)</label>
            <input
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              required
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-pink-600 text-white p-2 font-semibold hover:bg-pink-700"
          >
            Get Cycle Info
          </button>
        </form>

        {error && (
          <div className="bg-red-100 text-red-600 rounded p-2 mt-4">
            {error}
          </div>
        )}

        {results && (
  <div className="bg-pink-50 rounded-xl p-6 mt-6 shadow flex flex-col items-center">
   
    {/* Heading */}
    <h2 className="text-2xl font-bold text-pink-600 font-['Lexend'] mb-3">
      Your Cycle Insights
    </h2>

    {/* Result Details */}
    <div className="text-gray-700 text-base font-['Lexend'] space-y-2 text-center">
      <p>
        <span className="font-semibold text-pink-700">Next Period Date:</span>{" "}
        {results.next_period_date}
      </p>
      <p>
        <span className="font-semibold text-pink-700">Ovulation Date:</span>{" "}
        {results.ovulation_date}
      </p>
      <div>
        🌸{" "}
        <span className="font-semibold text-pink-700">
          Fertile Window:
        </span>{" "}
        {results.fertile_window.start} ➔ {results.fertile_window.end}
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
