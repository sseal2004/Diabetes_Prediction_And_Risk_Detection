import React, { useState } from "react";
import axios from "axios";

const DiabetesForm = ({ setResult, setFormData }) => {

  const [data, setData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/predict",
        data
      );

      setResult(res.data);
      setFormData(data);

    } catch (err) {
      alert("Prediction failed");
    }
  };

  return (

    <form onSubmit={handleSubmit} className="form">

      {Object.keys(data).map((key) => (
        <input
          key={key}
          type="number"
          name={key}
          placeholder={key}
          value={data[key]}
          onChange={handleChange}
          required
        />
      ))}

      <button type="submit">Predict</button>

    </form>

  );
};

export default DiabetesForm;