import { useState } from "react";
import { makePrediction } from "../services/api";
import breastImg from "../assets/images/girl3.png";
import ResultCard from "../components/ResultCard";
import { Link } from "react-router-dom";

const fields = [
  { name: "Clump Thickness", placeholder: "e.g. 1-10" },
  { name: "Uniformity of Cell Size", placeholder: "e.g. 1-10" },
  { name: "Uniformity of Cell Shape", placeholder: "e.g. 1-10" },
  { name: "Marginal Adhesion", placeholder: "e.g. 1-10" },
  { name: "Single Epithelial Cell Size", placeholder: "e.g. 1-10" },
  { name: "Bare Nuclei", placeholder: "e.g. 1-10" },
  { name: "Bland Chromatin", placeholder: "e.g. 1-10" },
  { name: "Normal Nucleoli", placeholder: "e.g. 1-10" },
  { name: "Mitoses", placeholder: "e.g. 1-10" }
];

const BreastCancer = () => {
  const initialForm = {};
  fields.forEach(f => initialForm[f.name] = "");

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

      const data = await makePrediction("breastCancer", parsedData);
      console.log("Backend response:", data);

      let message;
      if (typeof data.message === "string") {
        message = data.message;
      } else if (typeof data.message === "object" && data.message.prediction) {
        message = data.message.prediction;
      } else {
        message = "Unknown result";
      }

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
        Breast Cancer Prediction
      </h1>
      <p className="text-[#826b70] text-sm mt-1 font-['Lexend']">
        Predict the likelihood of benign or malignant tumors based on cellular features.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="grid grid-cols-2 gap-6">
          {fields.map((f) => (
            <div key={f.name} className="flex flex-col">
              <label className="text-[#161114] text-base font-medium font-['Lexend'] mb-2">
                {f.name}
              </label>
              <input
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                placeholder={f.placeholder}
                className="h-14 bg-[#f4f2f2] rounded-xl border-0 text-[#826b70] font-['Lexend'] p-4 w-full"
                required
                type="number"
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
              className="bg-[#ef427c] hover:bg-[#b85a7a] rounded-[20px] px-8 py-3 text-white text-sm font-bold font-['Lexend'] disabled:opacity-50"
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
            riskLevel={result.toLowerCase().includes("malignant") ? "high" :
                       result.toLowerCase().includes("benign") ? "low" : "moderate"}
            title={result}
            description={
              result.toLowerCase().includes("malignant")
                ? "Your result indicates a higher risk of malignancy. Please consult your doctor immediately."
                : result.toLowerCase().includes("benign")
                ? "Your result indicates a benign outcome. However, regular check-ups are advisable."
                : "Result is unclear. Please consult a healthcare professional."
            }
            imageSrc={breastImg}
          />
        </div>
      )}
    </div>
  );
};

export default BreastCancer;
