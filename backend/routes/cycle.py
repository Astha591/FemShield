from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta

# Create the Blueprint
cycle_bp = Blueprint('cycle', __name__)

@cycle_bp.route("/cycle_tracking", methods=["POST"])
def cycle_tracking():
    data = request.json
    last_period_date = data.get("last_period_date")  # e.g., "2024-06-01"
    cycle_length = data.get("cycle_length")           # e.g., 28

    #  Validate Inputs
    if not last_period_date or not cycle_length:
        return jsonify({"error": "Missing required fields: 'last_period_date' or 'cycle_length'"}), 400

    #  Parse the Date
    try:
        last_period = datetime.strptime(last_period_date, "%Y-%m-%d")
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

    #  Perform Cycle Calculations
    next_period = last_period + timedelta(days=int(cycle_length))
    ovulation_day = last_period + timedelta(days=int(cycle_length) // 2)
    fertile_start = ovulation_day - timedelta(days=3)
    fertile_end = ovulation_day + timedelta(days=3)

    # Build the Result
    result = {
        "next_period_date": next_period.strftime("%Y-%m-%d"),
        "ovulation_date": ovulation_day.strftime("%Y-%m-%d"),
        "fertile_window": {
            "start": fertile_start.strftime("%Y-%m-%d"),
            "end": fertile_end.strftime("%Y-%m-%d"),
        },
    }

    # Return as JSON
    return jsonify(result), 200
