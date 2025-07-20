import { useState } from "react";
import { makePrediction } from "../services/api";
import cerv from "../assets/images/girl3.png"; // replace with your image path
import ResultCard from "../components/ResultCard";
import { Link } from "react-router-dom";

const fieldLabels = [
  { name: "Age", placeholder: "Enter your age" },
  { name: "Number of sexual partners", placeholder: "Number of sexual partners" },
  { name: "First sexual intercourse", placeholder: "Age at first sexual intercourse" },
  { name: "Num of pregnancies", placeholder: "Number of pregnancies" },
  { name: "Smokes", placeholder: "0 or 1" },
  { name: "Smokes (years)", placeholder: "Years of smoking" },
  { name: "Smokes (packs/year)", placeholder: "Packs per year" },
  { name: "Hormonal Contraceptives", placeholder: "0 or 1" },
  { name: "Hormonal Contraceptives (years)", placeholder: "Years of use" },
  { name: "IUD", placeholder: "0 or 1" },
  { name: "IUD (years)", placeholder: "Years of use" },
  { name: "STDs", placeholder: "0 or 1" },
  { name: "STDs (number)", placeholder: "Number of STDs" },
  { name: "STDs:condylomatosis", placeholder: "0 or 1" },
  { name: "STDs:cervical condylomatosis", placeholder: "0 or 1" },
  { name: "STDs:vaginal condylomatosis", placeholder: "0 or 1" },
  { name: "STDs:vulvo-perineal condylomatosis", placeholder: "0 or 1" },
  { name: "STDs:syphilis", placeholder: "0 or 1" },
  { name: "STDs:pelvic inflammatory disease", placeholder: "0 or 1" },
  { name: "STDs:genital herpes", placeholder: "0 or 1" },
  { name: "STDs:molluscum contagiosum", placeholder: "0 or 1" },
  { name: "STDs:AIDS", placeholder: "0 or 1" },
  { name: "Dx:CIN", placeholder: "0 or 1" },
  { name: "Dx:HPV", placeholder: "0 or 1" },
  { name: "Dx:Cancer", placeholder: "0 or 1" },
  { name: "Dx:CIS", placeholder: "0 or 1" },
  { name: "Dx:LSIL", placeholder: "0 or 1" },
  { name: "Dx:HSIL", placeholder: "0 or 1" },
  { name: "Dx:Carcinoma", placeholder: "0 or 1" },
  { name: "Dx:Normal", placeholder: "0 or 1" },
  { name: "Dx:Other", placeholder: "0 or 1" },
  { name: "Dx:Asc-H", placeholder: "0 or 1" },
];

const CervicalCancer = () => {
  const initialForm = {};
  fieldLabels.forEach(f => {
    initialForm[f.name] = "";
  });

  const [form, setForm] = useState(initialForm);
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

      console.log("Cervical parsedData:", parsedData);

      const data = await makePrediction("cervicalCancer", parsedData);
      setResult(data.message);
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
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[32px] font-bold text-[#161114] font-['Lexend']">
          Cervical Cancer Risk Assessment
        </h1>
        <p className="text-[#826b70] text-sm mt-1 font-['Lexend']">
          AI-driven insights to help you assess your cervical cancer risk.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {fieldLabels.map((field) => (
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

        {/* Buttons */}
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

      {/* Error Message */}
      {error && (
        <p className="text-red-600 mt-4 text-center font-['Lexend']">
          {error}
        </p>
      )}

      {/* Result */}
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
                ? "Your inputs suggest a higher cervical cancer risk. Please consult your doctor promptly."
                : result.toLowerCase().includes("moderate")
                ? "Moderate risk factors detected. Consider discussing your results with a healthcare professional."
                : "Based on your inputs, your cervical cancer risk is currently low. Maintain regular screenings and stay proactive about your health."
            }
            imageSrc={cerv}
          />
        </div>
      )}
    </div>
  );
};

export default CervicalCancer;
