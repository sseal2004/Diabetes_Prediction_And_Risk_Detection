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
      const res = await axios.post("https://diabetes-prediction-and-risk-detection.onrender.com/predict", data);
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
        html, body, #root { margin: 0; padding: 0; width: 100%; height: 100%; overflow-x: hidden; }

        /* ── Keyframes ── */
        @keyframes db-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        @keyframes db-load {
          0%      { transform: scaleX(0); transform-origin: left; }
          50%     { transform: scaleX(1); transform-origin: left; }
          50.001% { transform: scaleX(1); transform-origin: right; }
          100%    { transform: scaleX(0); transform-origin: right; }
        }
        .db-blink        { animation: db-blink 2s ease-in-out infinite; }
        .db-loading-bar  { animation: db-load 1.5s ease-in-out infinite; }

        /* ── Spin-button removal ── */
        .db-input::-webkit-inner-spin-button,
        .db-input::-webkit-outer-spin-button { -webkit-appearance: none; }
        .db-input { -moz-appearance: textfield; }

        /* ── Complex shadows / glows ── */
        .db-card-shadow {
          box-shadow:
            0 0 0 1px rgba(0,255,180,0.1),
            0 0 40px rgba(0,255,180,0.05),
            0 40px 90px rgba(0,0,0,0.85),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .db-btn-hover-shadow:hover {
          box-shadow: 0 0 28px rgba(0,255,180,0.1);
        }
        .db-input:focus {
          background: rgba(0,255,180,0.03);
          border-color: rgba(0,255,180,0.32);
          box-shadow: 0 0 0 3px rgba(0,255,180,0.05);
        }

        /* ── Pseudo-element decorations ── */
        .db-header-after::after {
          content: '';
          position: absolute;
          bottom: 0; left: 36px; right: 36px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,180,0.35), transparent);
        }
        @media (max-width: 1025px) {
          .db-header-after::after { left: 20px; right: 20px; }
        }

        .db-eyebrow-before::before {
          content: '';
          width: 90px; height: 1px;
          background: rgba(0,255,180,0.45);
          flex-shrink: 0;
        }
        @media (max-width: 1025px) {
          .db-eyebrow-before::before { width: 50px; }
        }

        .db-left-radial::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 10% 10%, rgba(0,255,180,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 90% 90%, rgba(0,150,255,0.04) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .db-btn-fx::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,255,180,0.1) 0%, rgba(0,180,255,0.07) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .db-btn-fx:hover::before { opacity: 1; }
        .db-btn-fx::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transition: left 0.5s ease;
        }
        .db-btn-fx:hover::after { left: 150%; }

        /* ── Grid background ── */
        .db-grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        @media (max-width: 1025px) {
          .db-grid-bg { background-size: 30px 30px; opacity: 0.2; }
        }

        /* ── Right panel backgrounds ── */
        .db-right-overlay {
          background:
            linear-gradient(90deg, #07070f 0%, rgba(7,7,15,0.5) 12%, rgba(7,7,15,0) 35%),
            linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 72%, rgba(0,0,0,0.6) 100%);
        }
        .db-right-scan {
          background-image: repeating-linear-gradient(
            0deg,
            transparent, transparent 3px,
            rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
          );
        }
      `}</style>

      {/* ── Shell ── */}
      <div
        className="flex w-screen min-h-screen overflow-x-hidden bg-[#06060e]
                   max-[1025px]:flex-col max-[1025px]:bg-[#07070f] max-[1025px]:py-5
                   lg:h-screen lg:overflow-hidden"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >

        {/* ══ LEFT: Form ══ */}
        <div
          className="db-left-radial relative bg-[#07070f] flex flex-col justify-center
                     max-[1025px]:flex-none max-[1025px]:w-full max-[1025px]:min-h-screen max-[1025px]:py-5
                     min-[769px]:max-[1024px]:flex-[0_0_55%]
                     lg:flex-[0_0_50%] lg:w-1/2 lg:h-screen"
        >
          {/* Grid */}
          <div
            className="db-grid-bg fixed max-[768px]:absolute inset-0 pointer-events-none z-0"
          />

          {/* Card */}
          <div
            className="db-card-shadow relative z-10
                       bg-[rgba(10,10,20,0.98)] border border-white/10 rounded-[4px] overflow-hidden
                       max-[1025px]:mx-4 max-[1025px]:max-w-[480px] max-[1025px]:mx-auto"
          >

            {/* Header */}
            <div
              className="db-header-after relative
                         px-10 pt-[42px] pb-8
                         max-[1025px]:px-5 max-[1025px]:pt-6 max-[1025px]:pb-5 max-[1025px]:text-center
                         border-b border-white/[0.06]
                         bg-gradient-to-br from-[rgba(0,255,180,0.02)] to-transparent"
            >
              {/* Eyebrow */}
              <div
                className="db-eyebrow-before flex items-center gap-2 mb-[10px]
                           max-[1025px]:justify-center max-[1025px]:mb-3 max-[1025px]:gap-1.5
                           text-[rgba(0,255,180,0.65)] uppercase font-medium
                           text-[30px] tracking-[0.3em]
                           max-[1025px]:text-[16px] max-[1025px]:tracking-[0.12em]"
              >
                <span
                  className="db-blink flex-shrink-0 rounded-full bg-[rgba(0,255,180,0.85)] shadow-[0_0_7px_rgba(0,255,180,0.6)]
                             w-[80px] h-[20px]
                             max-[1025px]:w-3 max-[1025px]:h-3"
                />
                Clinical Analysis System
              </div>

              {/* Title */}
              <div
                className="font-['Bebas_Neue'] text-white leading-[0.88] mb-[14px] tracking-[0.02em]
                           [text-shadow:0_0_60px_rgba(0,255,180,0.12)]
                           text-[254px]
                           max-[1025px]:text-[56px] max-[1025px]:mb-[10px] max-[1025px]:tracking-[0.03em]
                           min-[769px]:max-[1024px]:text-[120px]"
              >
                DIABETES
                <span
                  className="block text-transparent tracking-[0.1em]
                             text-[150px]
                             max-[1025px]:text-[82px] max-[1025px]:tracking-[0.08em]
                             min-[769px]:max-[1024px]:text-[70px]"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}
                >
                  PREDICTOR
                </span>
              </div>

              {/* Subtitle */}
              <div
                className="text-white/[0.28] tracking-[0.06em]
                           text-[30px]
                           max-[1025px]:text-[16px] max-[1025px]:tracking-[0.03em] max-[1025px]:max-w-[300px] max-[1025px]:mx-auto max-[1025px]:leading-[1.4]"
              >
                Enter biomarker values for ML-powered risk assessment
              </div>

              {/* Loading bar */}
              {loading && (
                <div className="db-loading-bar absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[rgba(0,255,180,0.8)] to-[rgba(0,180,255,0.8)]" />
              )}
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="px-10 pt-[30px] pb-9 max-[1025px]:px-5 max-[1025px]:pt-6 max-[1025px]:pb-7"
            >
              {/* Fields grid */}
              <div
                className="grid grid-cols-2 gap-[14px] mb-6
                           max-[1025px]:grid-cols-1 max-[1025px]:gap-[18px] max-[1025px]:mb-6
                           min-[769px]:max-[1024px]:gap-3"
              >
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className={`relative group${field.key === "DiabetesPedigreeFunction" ? " col-span-2 max-[1025px]:col-span-1" : ""}`}
                  >
                    {/* Label */}
                    <div
                      className="flex justify-between items-center mb-[5px]
                                 max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-[2px] max-[1025px]:mb-[10px]"
                    >
                      <span
                        className="font-medium uppercase text-white/30 transition-colors duration-200 group-focus-within:text-[rgba(0,255,180,0.7)]
                                   text-[25.5px] tracking-[0.18em]
                                   max-[1025px]:text-[14px] max-[1025px]:tracking-[0.08em]
                                   min-[769px]:max-[1024px]:text-[22px]"
                      >
                        {field.label}
                      </span>
                      <span
                        className="italic text-white/[0.18]
                                   text-[8.5px]
                                   max-[1025px]:text-[11px]"
                      >
                        {field.unit}
                      </span>
                    </div>

                    {/* Input */}
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
                      className="db-input w-full
                                 px-[18px] py-[17px] text-[40px]
                                 max-[1025px]:px-4 max-[1025px]:py-[18px] max-[1025px]:text-[18px] max-[1025px]:min-h-[60px]
                                 bg-white/[0.03] border border-white/[0.09] rounded-[3px]
                                 text-white font-['DM_Mono'] tracking-[0.04em]
                                 outline-none transition-all duration-200
                                 placeholder:text-white/10 placeholder:text-xs"
                    />
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent mb-6 max-[1025px]:mb-7" />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="db-btn-fx db-btn-hover-shadow
                           relative w-full bg-transparent overflow-hidden
                           border border-[rgba(0,255,180,0.32)] rounded-[3px]
                           text-white font-['Bebas_Neue'] cursor-pointer
                           transition-all duration-300
                           hover:border-[rgba(0,255,180,0.55)] hover:-translate-y-px
                           disabled:hover:transform-none
                           p-5 text-[42px] tracking-[0.26em]
                           max-[1025px]:py-[22px] max-[1025px]:px-5 max-[1025px]:text-[20px] max-[1025px]:tracking-[0.12em] max-[1025px]:min-h-[68px]"
              >
                <div
                  className="flex items-center justify-center relative z-10
                             gap-[13px]
                             max-[1025px]:gap-[10px]"
                >
                  <div
                    className="flex items-center justify-center border border-[rgba(0,255,180,0.45)] rounded-full
                               w-[46px] h-[46px] text-[8px]
                               max-[1025px]:w-10 max-[1025px]:h-10 max-[1025px]:text-[7px]"
                  >
                    ▶
                  </div>
                  {loading ? "ANALYZING..." : "RUN PREDICTION"}
                </div>
              </button>
            </form>

            {/* Footer */}
            <div
              className="flex items-center justify-between
                         px-10 py-[14px]
                         max-[1025px]:px-5 max-[1025px]:py-4 max-[1025px]:flex-col max-[1025px]:gap-2 max-[1025px]:text-center
                         border-t border-white/[0.05] bg-black/[0.22]"
            >
              <span
                className="uppercase text-white/[0.16]
                           text-[18.5px] tracking-[0.12em]
                           max-[1025px]:text-[12px] max-[1025px]:tracking-[0.05em]"
              >
                Powered by machine learning
              </span>
              <span
                className="text-[rgba(0,255,180,0.28)]
                           text-[18.5px] tracking-[0.1em]
                           max-[1025px]:text-[12px] max-[1025px]:tracking-[0.05em]"
              >
                v2.1.0 · PIMA Dataset
              </span>
            </div>
          </div>
        </div>

        {/* ══ RIGHT: Visual Panel (Desktop Only) ══ */}
        <div className="max-[1025px]:hidden flex-1 relative overflow-hidden h-screen">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=90&fit=crop&crop=center"
            alt="Medical visualization"
            className="absolute inset-0 w-full h-full object-cover object-center [filter:saturate(0.55)_brightness(0.5)]"
          />
          <div className="db-right-overlay absolute inset-0" />
          <div
            className="absolute inset-0 [mix-blend-mode:screen]"
            style={{ background: 'radial-gradient(ellipse 65% 65% at 60% 45%, rgba(0,220,145,0.07) 0%, transparent 70%)' }}
          />
          <div className="db-right-scan absolute inset-0 pointer-events-none" />

          {/* Corners */}
          <div className="absolute top-[22px] left-[22px] w-[26px] h-[26px] border-t border-l border-[rgba(0,255,180,0.28)]" />
          <div className="absolute bottom-[22px] right-[22px] w-[26px] h-[26px] border-b border-r border-[rgba(0,255,180,0.28)]" />

          {/* Caption */}
          <div className="absolute bottom-11 right-9 text-right">
            <div className="font-['DM_Mono'] text-[49px] tracking-[0.28em] uppercase text-[rgba(0,255,180,0.42)] mb-2">
              PIMA Indians Dataset
            </div>
            <div
              className="font-['Bebas_Neue'] text-[146px] leading-[0.88] text-white/[0.82] tracking-[0.05em]"
              style={{ textShadow: '0 4px 40px rgba(0,0,0,0.9)' }}
            >
              KNOW YOUR<br />RISK SCORE
            </div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[rgba(0,255,180,0.45)] my-[10px] ml-auto" />
            <div className="font-['DM_Mono'] text-[60px] text-white/[0.28] tracking-[0.1em] mt-[10px]">
              Early detection saves lives
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiabetesForm;