from flask import Flask
from flask_cors import CORS
from models import db, Doctor, Appointment  # Import db & Models

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///femshield.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize the database
db.init_app(app)

# Import Blueprints
from routes.prediction import prediction_bp
from routes.cycle import cycle_bp
from routes.nutrition import nutrition_bp
from routes.chat import chat_bp
from routes.telehealth import telehealth_bp

app.register_blueprint(prediction_bp)
app.register_blueprint(cycle_bp)
app.register_blueprint(nutrition_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(telehealth_bp)

if __name__ == '__main__':
    with app.app_context():
        # Create tables
        db.create_all()

        # Insert sample data if no doctors present
        if Doctor.query.count() == 0:
            doc1 = Doctor(
                name="Dr. Asha Sharma",
                specialization="Gynecologist",
                available_slots="10:00 AM,2:00 PM,4:00 PM"
            )
            doc2 = Doctor(
                name="Dr. Rina Das",
                specialization="Endocrinologist",
                available_slots="9:30 AM,1:30 PM,3:30 PM"
            )
            db.session.add_all([doc1, doc2])
            db.session.commit()

    app.run(port=5000, debug=True)
