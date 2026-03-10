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
    <>
      <style>{`

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap');

*{
box-sizing:border-box;
margin:0;
padding:0;
}

html,body,#root{
width:100%;
height:100%;
background:#06060e;
font-family:'DM Mono',monospace;
}

/* MAIN LAYOUT */

.rp-shell{
width:100vw;
min-height:100vh;
display:flex;
background:#06060e;
}

/* LEFT PANEL */

.rp-left{
flex:0 0 55%;
display:flex;
align-items:center;
justify-content:center;
padding:40px;
}

/* REPORT CARD */

.rp-card{
width:530%;
max-width:860px;
background:rgba(10,10,20,0.97);
border:1px solid rgba(255,255,255,0.08);
box-shadow:
0 0 0 1px rgba(0,255,180,0.08),
0 0 40px rgba(0,255,180,0.04),
0 40px 90px rgba(0,0,0,0.85);
}

/* HEADER */

.rp-header{
padding:90px 90px 70px;
border-bottom:1px solid rgba(255,255,255,0.06);
}

.rp-eyebrow{
font-size:23px;
letter-spacing:.28em;
color:rgba(0,255,180,0.7);
text-transform:uppercase;
margin-bottom:18px;
display:flex;
align-items:center;
gap:10px;
}

.rp-pulse{
width:30px;
height:10px;
border-radius:50%;
background:${isHighRisk ? "#ff5b6e" : "#00ffb4"};
box-shadow:0 0 12px ${isHighRisk ? "#ff5b6e" : "#00ffb4"};
}

/* TITLE */

.rp-title{
font-family:'Bebas Neue',sans-serif;
font-size:114px;
line-height:.85;
color:white;
margin-bottom:14px;
}

.rp-title span{
font-size:50px;
letter-spacing:.12em;
color:transparent;
-webkit-text-stroke:1px rgba(255,255,255,0.3);
}

/* SUBTITLE */

.rp-subtitle{
font-size:35px;
color:rgba(255,255,255,0.45);
}

/* SECTIONS */

.rp-section{
padding:34px 50px;
border-bottom:1px solid rgba(255,255,255,0.05);
}

.rp-section-label{
font-size:33px;
letter-spacing:.2em;
text-transform:uppercase;
color:rgba(255,255,255,0.35);
margin-bottom:18px;
}

/* BADGE */

.rp-badge{
display:inline-flex;
align-items:center;
gap:14px;
padding:14px 24px;
border:1px solid rgba(0,255,180,0.3);
background:rgba(0,255,180,0.08);
}

.rp-badge-text{
font-family:'Bebas Neue';
font-size:32px;
letter-spacing:.18em;
color:${isHighRisk ? "#ff7b8a" : "#00ffb4"};
}

/* TABLE */

.rp-table{
width:100%;
border-collapse:collapse;
}

.rp-table td{
padding:16px 0;
}

.rp-td-key{
font-size:23px;
letter-spacing:.15em;
text-transform:uppercase;
color:rgba(255,255,255,0.35);
}

.rp-td-val{
font-size:20px;
text-align:right;
color:white;
}

/* SUMMARY */

.rp-summary{
font-size:33px;
line-height:1.8;
color:rgba(255,255,255,0.65);
}

/* FOOTER */

.rp-footer{
display:flex;
justify-content:space-between;
padding:20px 50px;
background:rgba(0,0,0,0.3);
}

.rp-footer-text{
font-size:22px;
color:rgba(255,255,255,0.25);
}

.rp-version{
font-size:22px;
color:rgba(0,255,180,0.4);
}

/* BUTTON */

.rp-btn{
width:100%;
margin-top:22px;
padding:24px;
font-family:'Bebas Neue';
font-size:28px;
letter-spacing:.2em;
background:transparent;
border:1px solid rgba(0,255,180,0.35);
color:white;
cursor:pointer;
}

.rp-btn:hover{
border-color:#00ffb4;
box-shadow:0 0 25px rgba(0,255,180,0.2);
}

/* RIGHT IMAGE PANEL */

.rp-right{
flex:1;
position:relative;
}

.rp-right img{
width:100%;
height:100%;
object-fit:cover;
filter:brightness(.5) saturate(.6);
}

/* MOBILE */

@media(max-width:900px){

.rp-shell{
flex-direction:column;
}

.rp-right{
display:none;
}

.rp-left{
flex:none;
width:100%;
padding:20px;
}

.rp-card{
max-width:100%;
}

.rp-title{
font-size:64px;
}

.rp-title span{
font-size:46px;
}

}

      `}</style>

      <div className="rp-shell">

        {/* LEFT REPORT */}
        <div className="rp-left">

          <div>

            <div id="report" className="rp-card">

              <div className="rp-header">

                <div className="rp-eyebrow">
                  <span className="rp-pulse"></span>
                  Clinical Analysis Report
                </div>

                <div className="rp-title">
                  DIABETES
                  <span>PREDICTION</span>
                </div>

                <div className="rp-subtitle">
                  ML-Powered Risk Assessment · PIMA Dataset
                </div>

              </div>

              <div className="rp-section">

                <div className="rp-section-label">
                  Prediction Result
                </div>

                <div className="rp-badge">
                  <div className="rp-badge-text">
                    {isHighRisk ? "HIGH RISK" : "LOW RISK"}
                  </div>
                </div>

              </div>

              <div className="rp-section">

                <div className="rp-section-label">
                  Biomarker Values
                </div>

                <table className="rp-table">
                  <tbody>
                    {Object.entries(formData).map(([key,value]) => (
                      <tr key={key}>
                        <td className="rp-td-key">
                          {key.replace(/([A-Z])/g," $1")}
                        </td>
                        <td className="rp-td-val">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>

              <div className="rp-section">

                <div className="rp-section-label">
                  Summary
                </div>

                <p className="rp-summary">
                  {result.result}
                </p>

              </div>

              <div className="rp-footer">
                <span className="rp-footer-text">
                  Auto Generated Medical Report
                </span>

                <span className="rp-version">
                  v2.1 · PIMA Dataset
                </span>
              </div>

            </div>

            <button onClick={downloadPDF} className="rp-btn">
              Download PDF Report
            </button>

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="rp-right">

          <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=90"
          alt="doctor"
          />

        </div>

      </div>

    </>
  );
};

export default Report;