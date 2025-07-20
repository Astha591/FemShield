from flask import Blueprint, request, jsonify
import re
import json
import os

chat_bp = Blueprint('chat_bp', __name__)

# Correct path to chat_data.json in the data directory
DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "chat_data.json")
with open(DATA_PATH) as f:
    data = json.load(f)

@chat_bp.route("/chatbot", methods=["POST"])
def chatbot():
    user_message = request.json.get("user_message", "").lower()
    if not user_message:
        return jsonify({"error": "No message received"}), 400

    # Simple keyword-based match
    for item in data["questions"]:
        if any(re.search(rf"\b{keyword}\b", user_message) for keyword in item["keywords"]):
            return jsonify({"reply": item["reply"]})
            
    # Default reply if no match
    return jsonify({
        "reply": "I'm here to help with women's health questions. Could you be more specific?"
    })
