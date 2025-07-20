import { useState } from "react";
import { makePrediction } from "../services/api";
import thyroidImg from "../assets/images/girl3.png"; // Replace with actual image path
import ResultCard from "../components/ResultCard";
import { Link } from "react-router-dom";

const fields = [
  { name: "age", placeholder: "Enter your age" },
  { name: "on_thyroxine", placeholder: "0 or 1" },
  { name: "query_on_thyroxine", placeholder: "0 or 1" },
  { name: "on_antithyroid_meds", placeholder: "0 or 1" },
  { name: "sick", placeholder: "0 or 1" },
  { name: "pregnant", placeholder: "0 or 1" },
  { name: "thyroid_surgery", placeholder: "0 or 1" },
  { name: "I131_treatment", placeholder: "0 or 1" },
  { name: "query_hypothyroid", placeholder: "0 or 1" },
  { name: "query_hyperthyroid", placeholder: "0 or 1" },
  { name: "lithium", placeholder: "0 or 1" },
  { name: "goitre", placeholder: "0 or 1" },
  { name: "tumor", placeholder: "0 or 1" },
  { name: "hypopituitary", placeholder: "0 or 1" },
  { name: "psych", placeholder: "0 or 1" },
  { name: "TSH", placeholder: "Enter TSH level" },
  { name: "T3", placeholder: "Enter T3 level" },
  { name: "TT4", placeholder: "Enter TT4 level" },
  { name: "T4U", placeholder: "Enter T4U level" },
  { name: "FTI", placeholder: "Enter FTI level" },
];

const Thyroid = () => {
  const initialForm = {};
  fields.forEach((f) => (initialForm[f.name] = ""));

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const parsedData = {};
      for (const key in form) {
        parsedData[key] = parseFloat(form[key]);
      }

      const data = await makePrediction("thyroid", parsedData);
      let message = typeof data.message === "string" ? data.message : data.message?.prediction || "No result";

      setResult(message);
      setError(null);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError(error.response?.data?.error || "Error getting prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-10 bg-white rounded-xl shadow">
      <h1 className="text-[32px] font-bold text-[#161114] font-['Lexend']">
        Thyroid Risk Assessment
      </h1>
      <p className="text-[#826b70] text-sm mt-1 font-['Lexend']">
        Predict thyroid-related conditions using your clinical information.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="grid grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-[#161114] text-base font-medium font-['Lexend'] mb-2">
                {field.name}
              </label>
              <input
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="h-14 bg-[#f4f2f2] rounded-xl border-0 text-[#826b70] font-['Lexend'] p-4 w-full"
                required
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            type="submit"
            className="bg-[#ef427c] hover:bg-[#b85a7a] rounded-[20px] px-8 py-3 text-white text-sm font-bold font-['Lexend'] disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Check Risk"}
          </button>
          <Link to="/">
            <button
              type="button"
              className="bg-[#ef427c] hover:bg-[#b85a7a] rounded-[20px] px-8 py-3 text-white text-sm font-bold font-['Lexend']"
            >
              Back to Assessments
            </button>
          </Link>
        </div>
      </form>

      {error && (
        <p className="text-red-600 mt-4 text-center font-['Lexend']">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-8">
          <ResultCard
            riskLevel={
              result.toLowerCase().includes("high")
                ? "high"
                : result.toLowerCase().includes("moderate")
                ? "moderate"
                : "low"
            }
            title={result}
            description={
              result.toLowerCase().includes("high")
                ? "You may be at high risk for a thyroid condition. Please consult an endocrinologist soon."
                : result.toLowerCase().includes("moderate")
                ? "Some indicators suggest a moderate risk. Consider medical follow-up."
                : "Your thyroid levels appear normal based on the inputs provided."
            }
            imageSrc={thyroidImg}
          />
        </div>
      )}
    </div>
  );
};

export default Thyroid;
