import { useState } from "react";
import { makePrediction } from "../services/api";
import { Link } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import preg from "../assets/images/preg.png";
import { CheckCircle, XCircle } from "lucide-react";

const fieldLabels = [
  { name: "Age", placeholder: "Enter your age" },
  { name: "SystolicBP", placeholder: "Enter your systolic blood pressure" },
  { name: "DiastolicBP", placeholder: "Enter your diastolic blood pressure" },
  { name: "BS", placeholder: "Enter your blood sugar level" },
  { name: "BodyTemp", placeholder: "Enter your body temperature" },
  { name: "HeartRate", placeholder: "Enter your heart rate" },
];

const PregnancyRisk = () => {
  const [form, setForm] = useState({
    Age: "",
    SystolicBP: "",
    DiastolicBP: "",
    BS: "",
    BodyTemp: "",
    HeartRate: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const parsedData = {};
      for (const key in form) {
        parsedData[key] = parseFloat(form[key]);
      }

      const data = await makePrediction("pregnancy", parsedData);
      setResult(data.message);
      setError(null);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError(error.response?.data?.error || "Error getting prediction.");
    } finally {
      setLoading(false);
    }
  };

  // Determine icon based on result
  const getIcon = (riskLevel) => {
    if (riskLevel === "high") {
      return <XCircle className="w-8 h-8 text-white" />;
    } else {
      return <CheckCircle className="w-8 h-8 text-white" />;
    }
  };

  const riskLevel =
    result?.toLowerCase().includes("high")
      ? "high"
      : result?.toLowerCase().includes("moderate")
      ? "moderate"
      : "low";

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#161114] font-['Lexend']">
          Pregnancy Risk Assessment
        </h1>
        <p className="text-[#826b70] text-base mt-2 font-['Lexend']">
          Empowering you with AI-driven insights for a healthy pregnancy journey.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {fieldLabels.map((field) => (
            <div key={field.name}>
              <label className="block text-[#161114] text-sm font-semibold font-['Lexend'] mb-2">
                {field.name}
              </label>
              <input
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="h-12 w-full rounded-lg bg-[#f4f2f2] border-0 text-[#826b70] font-['Lexend'] px-4"
                required
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            type="submit"
            className="bg-[#ef427c] hover:bg-[#b85a7a] text-white font-bold font-['Lexend'] text-sm px-8 py-3 rounded-full disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Check Risk"}
          </button>
          <Link to="/">
            <button
              type="button"
              className="bg-[#ef427c] hover:bg-[#b85a7a] text-white font-bold font-['Lexend'] text-sm px-8 py-3 rounded-full"
            >
              Back to Assessments
            </button>
          </Link>
        </div>
      </form>

      {/* Error */}
      {error && (
        <p className="text-red-600 mt-6 text-center font-['Lexend']">
          {error}
        </p>
      )}

      {/* Result */}
      {result && (
        <div className="mt-10">
          <ResultCard
            riskLevel={riskLevel}
            title={result}
            description={
              riskLevel === "high"
                ? "Your inputs suggest a higher pregnancy risk. Please consult your doctor for further evaluation and guidance."
                : riskLevel === "moderate"
                ? "There may be moderate risk factors. It's advisable to speak with a healthcare professional."
                : "Based on your inputs, your pregnancy risk is currently low. Keep maintaining a healthy lifestyle and consult your doctor regularly."
            }
            imageSrc={preg}
            icon={getIcon(riskLevel)}
          />
        </div>
      )}
    </div>
  );
};

export default PregnancyRisk;
