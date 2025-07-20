import { useState } from "react";
import { makePrediction } from "../services/api";
import pcosImg from "../assets/images/girl3.png"; // Replace with your PCOS illustration
import ResultCard from "../components/ResultCard";
import { Link } from "react-router-dom";

const pcosFields = [
  // BASIC INFO
  { group: "Basic Information", fields: [
    { name: "Age", placeholder: "Enter your age" },
    { name: "Weight", placeholder: "Enter your weight (kg)" },
    { name: "Height", placeholder: "Enter your height (cm)" },
    { name: "BMI", placeholder: "Enter your BMI" },
    { name: "PulseRate", placeholder: "Enter your pulse rate" },
    { name: "RR", placeholder: "Enter your respiratory rate" }
  ]},
  
  // HORMONAL
  { group: "Hormonal Indicators", fields: [
    { name: "FSH", placeholder: "Enter FSH level" },
    { name: "LSH", placeholder: "Enter LSH level" },
    { name: "FSH_LH_ratio", placeholder: "Enter FSH/LH ratio" },
    { name: "W_H_ratio", placeholder: "Enter waist-to-hip ratio" },
    { name: "TSH", placeholder: "Enter TSH level" },
    { name: "AMH", placeholder: "Enter AMH level" },
    { name: "PRL", placeholder: "Enter PRL level" },
    { name: "VitD3", placeholder: "Enter Vitamin D3 level" },
    { name: "PRG", placeholder: "Enter PRG level" },
    { name: "RBS", placeholder: "Enter RBS level" }
  ]},

  // SYMPTOMS
  { group: "Symptoms", fields: [
    { name: "Weight_gain", type: "boolean" },
    { name: "hair_growth", type: "boolean" },
    { name: "Skin_darkening", type: "boolean" },
    { name: "Hair_loss", type: "boolean" },
    { name: "Pimples", type: "boolean" },
    { name: "Fast_food", type: "boolean" },
    { name: "Reg_exercise", type: "boolean" }
  ]},

  // OTHER
  { group: "Other Details", fields: [
    { name: "BP_systolic", placeholder: "Enter systolic BP" },
    { name: "BP_diastolic", placeholder: "Enter diastolic BP" },
    { name: "Follicle_count", placeholder: "Enter follicle count" },
    { name: "Cycle(R/I)", placeholder: "Enter cycle regularity" },
    { name: "Cycle length(days)", placeholder: "Enter cycle length" },
    { name: "Pregnant", type: "boolean" },
    { name: "Abortions", placeholder: "Enter number of abortions" }
  ]}
];

const Pcos = () => {
  // Initialize all form fields to blank
  const initialForm = {};
  pcosFields.forEach(group => {
    group.fields.forEach(field => {
      initialForm[field.name] = "";
    });
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

      // Prepare data for backend
      const parsedData = {};
      for (const key in form) {
        const field = pcosFields
          .flatMap(g => g.fields)
          .find(f => f.name === key);

        if (field?.type === "boolean") {
          parsedData[key] = form[key] === "Yes" ? 1 : 0;
        } else {
          parsedData[key] = parseFloat(form[key]) || 0;
        }
      }

      const data = await makePrediction("pcos", parsedData);
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
    <div className="w-full max-w-6xl mx-auto p-10 bg-white rounded-xl shadow">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[32px] font-bold text-[#161114] font-['Lexend']">
          PCOS Risk Assessment
        </h1>
        <p className="text-[#826b70] text-sm mt-1 font-['Lexend']">
          Answer these questions to assess your risk of PCOS.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {pcosFields.map((group) => (
          <div key={group.group} className="mb-8">
            <h2 className="text-xl font-bold text-[#ef427c] mb-4 font-['Lexend']">
              {group.group}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {group.fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-[#161114] text-base font-medium font-['Lexend'] mb-2">
                    {field.name.replace(/_/g, " ")}
                  </label>
                  {field.type === "boolean" ? (
                    <select
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      className="h-14 bg-[#f4f2f2] rounded-xl border-0 text-[#826b70] font-['Lexend'] p-4 w-full"
                      required
                    >
                      <option value="">Select Yes or No</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    <input
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="h-14 bg-[#f4f2f2] rounded-xl border-0 text-[#826b70] font-['Lexend'] p-4 w-full"
                      required
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

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

      {/* Error */}
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
                ? "Your inputs suggest a higher PCOS risk. Please consult your doctor for further evaluation and guidance."
                : result.toLowerCase().includes("moderate")
                ? "There may be moderate risk factors. It's advisable to speak with a healthcare professional."
                : "Based on your inputs, your PCOS risk is currently low. Continue maintaining a healthy lifestyle and regular check-ups."
            }
            imageSrc={pcosImg}
          />
        </div>
      )}
    </div>
  );
};

export default Pcos;
