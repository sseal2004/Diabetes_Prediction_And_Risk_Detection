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

  const isHighRisk = result.prediction === 1;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8 font-mono">

      {/* Glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500 opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-xl flex flex-col gap-4">

        {/* REPORT CARD */}
        <div
          id="report"
          className="bg-gray-900 border border-white/8 rounded-sm overflow-hidden shadow-2xl"
        >

          {/* Header */}
          <div className="px-8 pt-10 pb-8 border-b border-white/5 relative">
            <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
            <p className="text-xs tracking-widest text-emerald-400/60 uppercase mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-emerald-400/50 inline-block" />
              Clinical Analysis Report
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
              DIABETES PREDICTION
            </h1>
            <p className="text-xs text-white/25 tracking-wider">
              ML-Powered Risk Assessment · PIMA Dataset
            </p>
          </div>

          {/* Risk Badge */}
          <div className="px-8 py-6 border-b border-white/5">
            <p className="text-xs tracking-widest uppercase text-white/30 mb-3">Prediction Result</p>
            <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-sm border ${
              isHighRisk
                ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            }`}>
              <span className={`w-2 h-2 rounded-full ${isHighRisk ? "bg-rose-400" : "bg-emerald-400"} shadow-lg`}
                style={{ boxShadow: isHighRisk ? "0 0 8px rgba(251,113,133,0.8)" : "0 0 8px rgba(52,211,153,0.8)" }}
              />
              <h2 className="text-xl font-bold tracking-widest uppercase">
                {isHighRisk ? "High Risk" : "Low Risk"}
              </h2>
            </div>
          </div>

          {/* Biomarker Table */}
          <div className="px-8 py-6 border-b border-white/5">
            <p className="text-xs tracking-widest uppercase text-white/30 mb-4">Biomarker Values</p>
            <table className="w-full">
              <tbody>
                {Object.entries(formData).map(([key, value], i) => (
                  <tr
                    key={key}
                    className={`group border-b border-white/4 last:border-0 transition-colors hover:bg-white/2`}
                  >
                    <td className="py-2.5 pr-4 text-xs tracking-widest uppercase text-white/35 w-1/2">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </td>
                    <td className="py-2.5 text-sm text-white/80 font-medium tracking-wide text-right">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="px-8 py-6">
            <p className="text-xs tracking-widest uppercase text-white/30 mb-3">Summary</p>
            <p className="text-sm text-white/50 leading-relaxed tracking-wide">{result.result}</p>
          </div>

          {/* Footer strip */}
          <div className="px-8 py-4 bg-black/30 border-t border-white/4 flex justify-between items-center">
            <span className="text-xs text-white/15 tracking-widest uppercase">Auto-generated</span>
            <span className="text-xs text-emerald-400/30 tracking-wider">v2.1.0</span>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={downloadPDF}
          className="w-full py-4 bg-transparent border border-emerald-400/30 rounded-sm text-white tracking-widest uppercase text-sm font-bold relative overflow-hidden group transition-all duration-300 hover:border-emerald-400/60 hover:shadow-lg"
          style={{ letterSpacing: "0.2em" }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/8 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center justify-center gap-3">
            <svg className="w-4 h-4 text-emerald-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF Report
          </span>
        </button>

      </div>
    </div>
  );
};

export default Report;