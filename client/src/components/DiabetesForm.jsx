import React, { useState } from "react";
import axios from "axios";

const fields = [
  { key: "Pregnancies", label: "Pregnancies", unit: "count" },
  { key: "Glucose", label: "Glucose", unit: "mg/dL" },
  { key: "BloodPressure", label: "Blood Pressure", unit: "mmHg" },
  { key: "SkinThickness", label: "Skin Thickness", unit: "mm" },
  { key: "Insulin", label: "Insulin", unit: "μU/mL" },
  { key: "BMI", label: "BMI", unit: "kg/m²" },
  { key: "DiabetesPedigreeFunction", label: "Pedigree Function", unit: "score" },
  { key: "Age", label: "Age", unit: "years" },
];

const DiabetesForm = ({ setResult, setFormData }) => {
  const [data, setData] = useState(
    Object.fromEntries(fields.map((f) => [f.key, ""]))
  );
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict", data);
      setResult(res.data);
      setFormData(data);
    } catch (err) {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          margin: 0; padding: 0;
          width: 100%; height: 100%;
          overflow-x: hidden;
        }

        .db-shell {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          font-family: 'DM Mono', monospace;
          background: #06060e;
        }

        /* ─── MOBILE (Form Only) ─── */
        @media (max-width: 768px) {
          .db-shell {
            flex-direction: column;
            background: #07070f;
            padding: 20px 0;
            min-height: 100vh;
          }

          .db-left {
            flex: none;
            width: 100%;
            height: auto;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 20px 0;
          }

          .db-right {
            display: none !important;
          }

          .db-card {
            margin: 0 16px;
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
          }

          .db-header {
            padding: 24px 20px 20px;
            text-align: center;
          }

          .db-eyebrow {
            font-size: 16px;
            letter-spacing: 0.12em;
            justify-content: center;
            margin-bottom: 12px;
            gap: 6px;
          }

          .db-eyebrow::before {
            width: 50px;
            height: 1px;
          }

          .db-pulse {
            width: 12px;
            height: 12px;
          }

          .db-title {
            font-size: 56px;
            line-height: 0.95;
            margin-bottom: 10px;
            letter-spacing: 0.03em;
          }

          .db-title span {
            font-size: 32px;
            letter-spacing: 0.08em;
          }

          .db-subtitle {
            font-size: 16px;
            letter-spacing: 0.03em;
            max-width: 300px;
            margin: 0 auto;
            line-height: 1.4;
          }

          .db-form { 
            padding: 24px 20px 28px; 
          }

          .db-fields {
            grid-template-columns: 1fr;
            gap: 18px;
            margin-bottom: 24px;
          }

          .db-field.wide { 
            grid-column: span 1; 
          }

          .db-label {
            margin-bottom: 10px;
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }

          .db-label-text {
            font-size: 14px;
            letter-spacing: 0.08em;
            font-weight: 500;
          }

          .db-unit {
            font-size: 11px;
            margin-left: 0;
          }

          .db-input {
            padding: 18px 16px;
            font-size: 18px;
            min-height: 60px;
            letter-spacing: 0.02em;
          }

          .db-input::placeholder { 
            font-size: 16px; 
          }

          .db-divider {
            margin: 0 0 28px;
            height: 1px;
          }

          .db-btn {
            padding: 22px 20px;
            font-size: 20px;
            letter-spacing: 0.12em;
            min-height: 68px;
          }

          .db-btn-icon {
            width: 40px;
            height: 40px;
            font-size: 7px;
          }

          .db-btn-inner {
            gap: 10px;
          }

          .db-footer {
            padding: 16px 20px;
            flex-direction: column;
            gap: 8px;
            text-align: center;
            margin-top: auto;
          }

          .db-footer-text, .db-version {
            font-size: 12px;
            letter-spacing: 0.05em;
          }

          .db-grid-bg {
            opacity: 0.2;
            background-size: 30px 30px;
          }

          .db-header::after {
            left: 20px;
            right: 20px;
          }
        }

        /* ─── TABLET ─── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .db-left {
            flex: 0 0 55%;
          }

          .db-title {
            font-size: 120px;
          }

          .db-title span {
            font-size: 70px;
          }

          .db-fields {
            gap: 12px;
          }

          .db-label-text {
            font-size: 22px;
          }
        }

        /* ─── DESKTOP ─── */
        @media (min-width: 1025px) {
          .db-shell {
            height: 100vh;
            overflow: hidden;
          }

          .db-left {
            flex: 0 0 50%;
            width: 50%;
            height: 100vh;
          }
        }

        /* ─── BASE FORM STYLES ─── */
        .db-left {
          background: #07070f;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .db-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 10% 10%, rgba(0,255,180,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 90% 90%, rgba(0,150,255,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        @media (min-width: 769px) {
          .db-left::before {
            z-index: 0;
          }
        }

        .db-grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 768px) {
          .db-grid-bg {
            position: absolute;
          }
        }

        .db-card {
          position: relative;
          z-index: 1;
          background: rgba(10,10,20,0.98);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(0,255,180,0.1),
            0 0 40px rgba(0,255,180,0.05),
            0 40px 90px rgba(0,0,0,0.85),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .db-header {
          padding: 42px 40px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative;
          background: linear-gradient(135deg, rgba(0,255,180,0.02) 0%, transparent 60%);
        }

        .db-header::after {
          content: '';
          position: absolute;
          bottom: 0; left: 36px; right: 36px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,180,0.35), transparent);
        }

        .db-eyebrow {
          font-size: 30px;
          font-weight: 500;
          letter-spacing: 0.3em;
          color: rgba(0,255,180,0.65);
          text-transform: uppercase;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .db-eyebrow::before {
          content: '';
          width: 90px; height: 1px;
          background: rgba(0,255,180,0.45);
          flex-shrink: 0;
        }

        .db-pulse {
          width: 60px; height: 15px;
          border-radius: 100%;
          background: rgba(0,255,180,0.85);
          box-shadow: 0 0 7px rgba(0,255,180,0.6);
          animation: db-blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes db-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }

        .db-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 154px;
          line-height: 0.88;
          color: #fff;
          letter-spacing: 0.02em;
          margin-bottom: 14px;
          text-shadow: 0 0 60px rgba(0,255,180,0.12);
        }

        .db-title span {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.22);
          display: block;
          font-size: 90px;
          letter-spacing: 0.1em;
        }

        .db-subtitle {
          font-size: 30px;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.06em;
        }

        .db-form { padding: 30px 40px 36px; }

        .db-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 24px;
        }

        .db-field { position: relative; }
        .db-field.wide { grid-column: span 2; }

        .db-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }

        .db-label-text {
          font-size: 25.5px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          transition: color 0.2s;
        }

        .db-field:focus-within .db-label-text { color: rgba(0,255,180,0.7); }

        .db-unit {
          font-size: 8.5px;
          color: rgba(255,255,255,0.18);
          font-style: italic;
        }

        .db-input {
          width: 100%;
          padding: 13px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 3px;
          color: #fff;
          font-family: 'DM Mono', monospace;
          font-size: 20px;
          letter-spacing: 0.04em;
          outline: none;
          transition: all 0.2s;
          -moz-appearance: textfield;
        }

        .db-input::-webkit-inner-spin-button,
        .db-input::-webkit-outer-spin-button { -webkit-appearance: none; }

        .db-input::placeholder { color: rgba(255,255,255,0.1); font-size: 12px; }

        .db-input:focus {
          background: rgba(0,255,180,0.03);
          border-color: rgba(0,255,180,0.32);
          box-shadow: 0 0 0 3px rgba(0,255,180,0.05);
        }

        .db-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          margin: 0 0 24px;
        }

        .db-btn {
          width: 100%;
          padding: 20px;
          background: transparent;
          border: 1px solid rgba(0,255,180,0.32);
          border-radius: 3px;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 0.26em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }

        .db-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,255,180,0.1) 0%, rgba(0,180,255,0.07) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .db-btn:hover::before { opacity: 1; }

        .db-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transition: left 0.5s ease;
        }

        .db-btn:hover::after { left: 150%; }

        .db-btn:hover {
          border-color: rgba(0,255,180,0.55);
          box-shadow: 0 0 28px rgba(0,255,180,0.1);
          transform: translateY(-1px);
        }

        .db-btn:disabled:hover {
          transform: none;
          box-shadow: none;
        }

        .db-btn-inner {
          display: flex; align-items: center; justify-content: center;
          gap: 13px; position: relative; z-index: 1;
        }

        .db-btn-icon {
          width: 46px; height: 46px;
          border: 1px solid rgba(0,255,180,0.45);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 8px;
        }

        .db-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 40px;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: rgba(0,0,0,0.22);
        }

        .db-footer-text { 
          font-size: 18.5px; 
          letter-spacing: 0.12em; 
          color: rgba(255,255,255,0.16); 
          text-transform: uppercase; 
        }
        
        .db-version { 
          font-size: 18.5px; 
          letter-spacing: 0.1em; 
          color: rgba(0,255,180,0.28); 
        }

        .db-loading-bar {
          position: absolute; bottom: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, rgba(0,255,180,0.8), rgba(0,180,255,0.8));
          animation: db-load 1.5s ease-in-out infinite;
          width: 100%;
        }

        @keyframes db-load {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          50.001% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }

        /* Desktop Right Panel Styles */
        @media (min-width: 769px) {
          .db-right {
            flex: 1;
            position: relative;
            overflow: hidden;
            height: 100vh;
          }

          .db-right-img {
            position: absolute;
            inset: 0;
            width: 100%; height: 100%;
            object-fit: cover;
            object-position: center;
            filter: saturate(0.55) brightness(0.5);
          }

          .db-right-overlay {
            position: absolute;
            inset: 0;
            background:
              linear-gradient(90deg, #07070f 0%, rgba(7,7,15,0.5) 12%, rgba(7,7,15,0.0) 35%),
              linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 72%, rgba(0,0,0,0.6) 100%);
          }

          .db-right-tint {
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse 65% 65% at 60% 45%, rgba(0,220,145,0.07) 0%, transparent 70%);
            mix-blend-mode: screen;
          }

          .db-right-scan {
            position: absolute;
            inset: 0;
            background-image: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.07) 3px,
              rgba(0,0,0,0.07) 4px
            );
            pointer-events: none;
          }

          .db-corner {
            position: absolute;
            width: 26px; height: 26px;
          }

          .db-corner-tl { top: 22px; left: 22px; border-top: 1px solid rgba(0,255,180,0.28); border-left: 1px solid rgba(0,255,180,0.28); }
          .db-corner-br { bottom: 22px; right: 22px; border-bottom: 1px solid rgba(0,255,180,0.28); border-right: 1px solid rgba(0,255,180,0.28); }

          .db-stats {
            position: absolute;
            top: 44px;
            right: 36px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: flex-end;
          }

          .db-stat {
            background: rgba(7,7,15,0.75);
            border: 1px solid rgba(0,255,180,0.14);
            border-radius: 2px;
            padding: 8px 14px;
            backdrop-filter: blur(10px);
            min-width: 110px;
          }

          .db-stat-val {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 24px;
            color: rgba(0,255,180,0.88);
            letter-spacing: 0.06em;
            line-height: 1;
          }

          .db-stat-label {
            font-family: 'DM Mono', monospace;
            font-size: 8px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.28);
            margin-top: 3px;
          }

          .db-caption {
            position: absolute;
            bottom: 44px;
            right: 36px;
            text-align: right;
          }

          .db-caption-tag {
            font-family: 'DM Mono', monospace;
            font-size: 49px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: rgba(0,255,180,0.42);
            margin-bottom: 8px;
          }

          .db-caption-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 146px;
            line-height: 0.88;
            color: rgba(255,255,255,0.82);
            letter-spacing: 0.05em;
            text-shadow: 0 4px 40px rgba(0,0,0,0.9);
          }

          .db-caption-sub {
            font-family: 'DM Mono', monospace;
            font-size: 60px;
            color: rgba(255,255,255,0.28);
            letter-spacing: 0.1em;
            margin-top: 10px;
          }

          .db-caption-line {
            width: 48px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0,255,180,0.45));
            margin: 10px 0 10px auto;
          }
        }
      `}</style>

      <div className="db-shell">
        {/* ── LEFT: Form ── */}
        <div className="db-left">
          <div className="db-grid-bg" />
          <div className="db-card">
            <div className="db-header">
              <div className="db-eyebrow">
                <span className="db-pulse" />
                Clinical Analysis System
              </div>
              <div className="db-title">
                DIABETES
                <span>PREDICTOR</span>
              </div>
              <div className="db-subtitle">
                Enter biomarker values for ML-powered risk assessment
              </div>
              {loading && <div className="db-loading-bar" />}
            </div>

            <form onSubmit={handleSubmit} className="db-form">
              <div className="db-fields">
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className={`db-field${field.key === "DiabetesPedigreeFunction" ? " wide" : ""}`}
                  >
                    <div className="db-label">
                      <span className="db-label-text">{field.label}</span>
                      <span className="db-unit">{field.unit}</span>
                    </div>
                    <input
                      type="number"
                      name={field.key}
                      placeholder="—"
                      value={data[field.key]}
                      onChange={handleChange}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused(null)}
                      required
                      step="any"
                      className="db-input"
                    />
                  </div>
                ))}
              </div>

              <div className="db-divider" />

              <button type="submit" className="db-btn" disabled={loading}>
                <div className="db-btn-inner">
                  <div className="db-btn-icon">▶</div>
                  {loading ? "ANALYZING..." : "RUN PREDICTION"}
                </div>
              </button>
            </form>

            <div className="db-footer">
              <span className="db-footer-text">Powered by machine learning</span>
              <span className="db-version">v2.1.0 · PIMA Dataset</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Visual Panel (Desktop Only) ── */}
        <div className="db-right">
          <img
            className="db-right-img"
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=90&fit=crop&crop=center"
            alt="Medical visualization"
          />
          <div className="db-right-overlay" />
          <div className="db-right-tint" />
          <div className="db-right-scan" />
          <div className="db-corner db-corner-tl" />
          <div className="db-corner db-corner-br" />
          <div className="db-caption">
            <div className="db-caption-tag">PIMA Indians Dataset</div>
            <div className="db-caption-title">
              KNOW YOUR<br />RISK SCORE
            </div>
            <div className="db-caption-line" />
            <div className="db-caption-sub">Early detection saves lives</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiabetesForm;
