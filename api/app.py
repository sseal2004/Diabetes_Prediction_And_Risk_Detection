from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import pickle


# Flask Setup

app = Flask(__name__)
CORS(app)


# Model Paths

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "../ml/models/diabetes_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "../ml/models/scaler.pkl")


# Load Model and Scaler

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

with open(SCALER_PATH, "rb") as f:
    scaler = pickle.load(f)

print(" Model and Scaler Loaded Successfully")


# Home Route

@app.route("/")
def home():
    return jsonify({
        "message": "Diabetes Prediction API Running"
    })

# Prediction Route

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        pregnancies = float(data["Pregnancies"])
        glucose = float(data["Glucose"])
        blood_pressure = float(data["BloodPressure"])
        skin_thickness = float(data["SkinThickness"])
        insulin = float(data["Insulin"])
        bmi = float(data["BMI"])
        diabetes_pedigree = float(data["DiabetesPedigreeFunction"])
        age = float(data["Age"])

        input_data = np.array([[

            pregnancies,
            glucose,
            blood_pressure,
            skin_thickness,
            insulin,
            bmi,
            diabetes_pedigree,
            age

        ]])

        # Scale input
        input_scaled = scaler.transform(input_data)

        # Prediction
        prediction = model.predict(input_scaled)

        if prediction[0] == 0:
            result = "The person is NOT diabetic"
        else:
            result = "The person IS diabetic"

        return jsonify({
            "prediction": int(prediction[0]),
            "result": result
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })


# Run Server

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)