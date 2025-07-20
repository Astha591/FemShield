from flask import Blueprint, request, jsonify
import joblib
import numpy as np
import os
import traceback

# Create the Blueprint
prediction_bp = Blueprint('prediction', __name__)

# Paths for your trained model files
model_dir = '../models'
model_paths = {
    "breast_cancer": "breast_cancer_model.pkl",
    "pcos": "pcos.pkl",
    "pregnancy": "maternal_risk_model.pkl",
    "thyroid": "thyroid_model.pkl",
    "cervical_cancer": "cervical_cancer_model.pkl"
}

# Load all the trained models
models = {}
for key, filename in model_paths.items():
    path = os.path.join(model_dir, filename)
    if os.path.exists(path):
        with open(path, 'rb') as f:
            models[key] = joblib.load(f)
    else:
        print(f"Warning: Model for '{key}' not found at path: {path}")

# ==========================================================
# 🩺 BREAST CANCER
@prediction_bp.route("/predict/breast_cancer", methods=["POST"])
def predict_breast_cancer():
    data = request.json
    required_fields = [
        "Clump Thickness",
        "Uniformity of Cell Size",
        "Uniformity of Cell Shape",
        "Marginal Adhesion",
        "Single Epithelial Cell Size",
        "Bare Nuclei",
        "Bland Chromatin",
        "Normal Nucleoli",
        "Mitoses"
    ]
    try:
        if any(field not in data for field in required_fields):
            return {"error": "Missing one or more required fields for Breast Cancer prediction"}, 400

        features = np.array([[data[f] for f in required_fields]])
        prediction = models["breast_cancer"].predict(features)

        pred_value = int(prediction[0])
        message = "⚠️ High Risk of Breast Cancer" if pred_value == 1 else "✅ Low Risk of Breast Cancer"

        return {
            "model": "breast_cancer",
            "prediction": pred_value,
            "message": message
        }
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e), "traceback": traceback.format_exc()}, 500


# ==========================================================
# 🌼 PCOS
@prediction_bp.route("/predict/pcos", methods=["POST"])
def predict_pcos():
    data = request.json
    required_fields = [
        "Age", "Weight", "Height", "BMI", "PulseRate", "RR",
        "Cycle(R/I)", "Cycle length(days)", "Pregnant", "Abortions",
        "FSH", "LSH", "FSH_LH_ratio", "W_H_ratio", "TSH", "AMH",
        "PRL", "VitD3", "PRG", "RBS", "Weight_gain", "hair_growth",
        "Skin_darkening", "Hair_loss", "Pimples", "Fast_food",
        "Reg_exercise", "BP_systolic", "BP_diastolic", "Follicle_count"
    ]
    try:
        if any(field not in data for field in required_fields):
            return {"error": "Missing required fields for PCOS prediction"}, 400
        features = np.array([[data[f] for f in required_fields]])
        prediction = models["pcos"].predict(features)

        pred_value = int(prediction[0])
        message = "⚠️ High Risk of PCOS" if pred_value == 1 else "✅ Low Risk of PCOS"

        return {"model": "pcos", "prediction": pred_value, "message": message}
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e), "traceback": traceback.format_exc()}, 500


# ==========================================================
# 🤰 PREGNANCY
@prediction_bp.route("/predict/pregnancy", methods=["POST"])
def predict_pregnancy():
    data = request.json
    required_fields = ["Age", "SystolicBP", "DiastolicBP", "BS", "BodyTemp", "HeartRate"]
    try:
        if any(field not in data for field in required_fields):
            return {"error": "Missing required fields for Pregnancy prediction"}, 400

        features = np.array([[data[f] for f in required_fields]])
        model_bundle = models["pregnancy"]
        model = model_bundle["model"]
        label_encoder = model_bundle["label_encoder"]

        prediction_encoded = model.predict(features)
        prediction_label = label_encoder.inverse_transform(prediction_encoded)[0]

        return {
            "model": "pregnancy",
            "prediction_encoded": int(prediction_encoded[0]),
            "message": prediction_label
        }
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e), "traceback": traceback.format_exc()}, 500


# ==========================================================
# 🦋 THYROID
@prediction_bp.route("/predict/thyroid", methods=["POST"])
def predict_thyroid():
    data = request.json
    required_fields = [
        "age", "on_thyroxine", "query_on_thyroxine",
        "on_antithyroid_meds", "sick", "pregnant", "thyroid_surgery",
        "I131_treatment", "query_hypothyroid", "query_hyperthyroid",
        "lithium", "goitre", "tumor", "hypopituitary", "psych",
        "TSH", "T3", "TT4", "T4U", "FTI"
    ]
    try:
        missing = [f for f in required_fields if f not in data]
        if missing:
            return {"error": f"Missing required fields: {missing}"}, 400

        features = np.array([[data[f] for f in required_fields]])
        prediction = models["thyroid"].predict(features)

        pred_value = int(prediction[0])
        message = "⚠️ High Risk of Thyroid Disorder" if pred_value == 1 else "✅ Low Risk of Thyroid Disorder"

        return {"model": "thyroid", "prediction": pred_value, "message": message}
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e), "traceback": traceback.format_exc()}, 500


# ==========================================================
# ♋️ CERVICAL CANCER
@prediction_bp.route("/predict/cervical_cancer", methods=["POST"])
def predict_cervical_cancer():
    data = request.json
    required_fields = [
        "Age",
        "Number of sexual partners",
        "First sexual intercourse",
        "Num of pregnancies",
        "Smokes",
        "Smokes (years)",
        "Smokes (packs/year)",
        "Hormonal Contraceptives",
        "Hormonal Contraceptives (years)",
        "IUD",
        "IUD (years)",
        "STDs",
        "STDs (number)",
        "STDs:condylomatosis",
        "STDs:cervical condylomatosis",
        "STDs:vaginal condylomatosis",
        "STDs:vulvo-perineal condylomatosis",
        "STDs:syphilis",
        "STDs:pelvic inflammatory disease",
        "STDs:genital herpes",
        "STDs:molluscum contagiosum",
        "STDs:AIDS",
        "Dx:CIN",
        "Dx:HPV",
        "Dx:Cancer",
        "Dx:CIS",
        "Dx:LSIL",
        "Dx:HSIL",
        "Dx:Carcinoma",
        "Dx:Normal",
        "Dx:Other",
        "Dx:Asc-H"
    ]
    try:
        if any(field not in data for field in required_fields):
            return {"error": "Missing required fields for Cervical Cancer prediction"}, 400
        features = np.array([[data[f] for f in required_fields]])
        prediction = models["cervical_cancer"].predict(features)

        pred_value = int(prediction[0])
        message = "⚠️ High Risk of Cervical Cancer" if pred_value == 1 else "✅ Low Risk of Cervical Cancer"

        return {"model": "cervical_cancer", "prediction": pred_value, "message": message}
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e), "traceback": traceback.format_exc()}, 500
