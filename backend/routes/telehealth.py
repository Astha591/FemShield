from flask import Blueprint, request, jsonify
from models import db, Doctor, Appointment

telehealth_bp = Blueprint('telehealth_bp', __name__)

@telehealth_bp.route("/doctors", methods=["GET"])
def get_doctors():
    doctors = Doctor.query.all()
    results = []
    for doctor in doctors:
        results.append({
            "id": doctor.id,
            "name": doctor.name,
            "specialization": doctor.specialization,
            "available_slots": doctor.available_slots.split(",")
        })
    return jsonify({"doctors": results})


@telehealth_bp.route("/book", methods=["POST"])
def book_appointment():
    data = request.json
    user_name = data.get("user_name")
    doctor_id = data.get("doctor_id")
    slot = data.get("slot")

    doctor = Doctor.query.get(doctor_id)

    if not doctor:
        return jsonify({"error": "Doctor not found"}), 404

    new_appointment = Appointment(user_name=user_name, doctor_id=doctor.id, slot=slot)
    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({
        "message": "Appointment booked successfully",
        "appointment": {
            "user_name": user_name,
            "doctor": doctor.name,
            "slot": slot
        }
    })

@telehealth_bp.route("/appointments", methods=["POST"])
def get_appointments():
    appointments = Appointment.query.all()
    results = []
    for app in appointments:
        results.append({
            "user_name": app.user_name,
            "doctor": app.doctor.name,
            "slot": app.slot
        })
    return jsonify({"appointments": results})
