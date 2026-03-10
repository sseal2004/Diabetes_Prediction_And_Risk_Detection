import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Report = ({ result, formData }) => {

  const downloadPDF = async () => {

    const element = document.getElementById("report");

    const canvas = await html2canvas(element, {
      scale: 2
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    pdf.save("diabetes_report.pdf");
  };

  return (

    <div>

      <div id="report" className="report">

        <h1>Diabetes Prediction Report</h1>

        <h2>
          {result.prediction === 1 ? "High Risk" : "Low Risk"}
        </h2>

        <table>
          <tbody>
            {Object.entries(formData).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>{result.result}</p>

      </div>

      <button onClick={downloadPDF}>
        Download Report
      </button>

    </div>

  );
};

export default Report;