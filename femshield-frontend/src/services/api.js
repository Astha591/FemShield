import axios from "axios";

/**
 * All prediction endpoints for FemShield.
 */
const endpoints = {
  pcos: "http://127.0.0.1:5000/predict/pcos",
  breastCancer: "http://127.0.0.1:5000/predict/breast_cancer",
  pregnancy: "http://localhost:5000/predict/pregnancy",
  thyroid: "http://localhost:5000/predict/thyroid",
  cervicalCancer: "http://localhost:5000/predict/cervical_cancer",
  cycleTracking:"http://127.0.0.1:5000/cycle_tracking"
};

/**
 * Generic prediction request.
 * 
 * @param {string} model - The key for the endpoint ('pcos','breastCancer','pregnancy','thyroid','cervicalCancer')
 * @param {object} data - The payload for the prediction.
 * @returns {object} The parsed JSON response.
 */
export const makePrediction = async (model, data) => {
  if (!endpoints[model]) {
    throw new Error(`Invalid model name: ${model}`);
  }

  try {
    const response = await axios.post(endpoints[model], data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
