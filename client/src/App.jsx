import React, { useState } from "react";
import DiabetesForm from "./components/DiabetesForm";
import Report from "./components/Report";

function App() {

  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);

  return (
    <div className="container">

      <h1>Diabetes Intelligence</h1>

      {!result ? (
        <DiabetesForm setResult={setResult} setFormData={setFormData} />
      ) : (
        <Report result={result} formData={formData} />
      )}

    </div>
  );
}

export default App;