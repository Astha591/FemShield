from flask import Blueprint, request, jsonify
import json
import os

nutrition_bp = Blueprint("nutrition_bp", __name__)

# Load JSON data
with open(os.path.join("data", "nutrition.json")) as f:
    NUTRITION_DATA = json.load(f)

@nutrition_bp.route("/nutrition", methods=["POST"])
def nutrition():
    data = request.json
    condition = data.get("condition", "").lower()
    recommendations = NUTRITION_DATA.get(condition)

    if recommendations:
        return jsonify(recommendations), 200
    else:
        return jsonify({"error": "Condition not found"}), 404
