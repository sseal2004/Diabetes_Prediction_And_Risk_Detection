import React, { useState } from "react";
import axios from "axios";

const fields = [
  { key: "Pregnancies",             label: "Pregnancies",       unit: "count"   },
  { key: "Glucose",                 label: "Glucose",           unit: "mg/dL"   },
  { key: "BloodPressure",           label: "Blood Pressure",    unit: "mmHg"    },
  { key: "SkinThickness",           label: "Skin Thickness",    unit: "mm"      },
  { key: "Insulin",                 label: "Insulin",           unit: "μU/mL"   },
  { key: "BMI",                     label: "BMI",               unit: "kg/m²"   },
  { key: "DiabetesPedigreeFunction",label: "Pedigree Function", unit: "score"   },
  { key: "Age",                     label: "Age",               unit: "years"   },
];

export default function DiabetesForm({ setResult, setFormData }) {
  const [data, setData]       = useState(Object.fromEntries(fields.map(f => [f.key, ""])));
  const [loading, setLoading] = useState(false);

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict", data);
      setResult(res.data);
      setFormData(data);
    } catch {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; overflow: hidden; }
        body { font-family: 'DM Mono', monospace; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-dm { font-family: 'DM Mono', monospace; }

        /* custom scrollbar */
        .slim-scroll::-webkit-scrollbar { width: 3px; }
        .slim-scroll::-webkit-scrollbar-track { background: transparent; }
        .slim-scroll::-webkit-scrollbar-thumb { background: rgba(0,255,180,0.2); border-radius: 2px; }

        /* shimmer on button */
        @keyframes shimmer {
          0%   { left: -100%; }
          100% { left: 200%; }
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          animation: shimmer 2.4s ease-in-out infinite;
        }

        /* loading bar */
        @keyframes loadbar {
          0%   { transform: scaleX(0); transform-origin: left; }
          50%  { transform: scaleX(1); transform-origin: left; }
          50.001% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        .loading-bar { animation: loadbar 1.5s ease-in-out infinite; }

        /* pulse dot */
        @keyframes pulsedot {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(0,255,180,0.7); }
          50%       { opacity: 0.15; box-shadow: none; }
        }
        .pulse-dot { animation: pulsedot 2s ease-in-out infinite; }

        /* grid bg */
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* scan lines */
        .scanlines {
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
          );
        }

        /* input focus glow */
        .field-input:focus {
          background: rgba(0,255,180,0.03);
          border-color: rgba(0,255,180,0.35);
          box-shadow: 0 0 0 3px rgba(0,255,180,0.06);
          outline: none;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.1); font-size: 12px; }
        .field-group:focus-within .field-label { color: rgba(0,255,180,0.75); }
      `}</style>

      {/* ─── SHELL ─── */}
      <div className="flex w-screen h-screen overflow-hidden" style={{ background: "#06060e" }}>

        {/* ════ LEFT — FORM PANEL ════ */}
        <div
          className="relative z-10 flex flex-col justify-center w-full md:w-1/2 h-screen overflow-y-auto overflow-x-hidden slim-scroll"
          style={{ background: "#07070f" }}
        >
          {/* radial ambient */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 10% 10%, rgba(0,255,180,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 90% 90%, rgba(0,150,255,0.04) 0%, transparent 60%)" }} />
          {/* grid */}
          <div className="absolute inset-0 pointer-events-none grid-bg" />

          {/* ── CARD ── */}
          <div
            className="relative z-10 mx-4 sm:mx-8 my-4 rounded-sm overflow-hidden"
            style={{
              background: "rgba(10,10,20,0.98)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 0 0 1px rgba(0,255,180,0.08), 0 0 40px rgba(0,255,180,0.04), 0 40px 90px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >

            {/* ── HEADER ── */}
            <div
              className="relative px-7 pt-7 pb-6"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "linear-gradient(135deg, rgba(0,255,180,0.02) 0%, transparent 60%)",
              }}
            >
              {/* teal gradient rule */}
              <div className="absolute bottom-0 left-7 right-7 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,180,0.4), transparent)" }} />

              {/* eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-px flex-shrink-0" style={{ background: "rgba(0,255,180,0.5)" }} />
                <div
                  className="pulse-dot flex-shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: "rgba(0,255,180,0.85)" }}
                />
                <span
                  className="font-mono-dm text-xs uppercase tracking-widest"
                  style={{ color: "rgba(0,255,180,0.65)", fontSize: "9px", letterSpacing: "0.28em" }}
                >
                  Clinical Analysis System
                </span>
              </div>

              {/* title */}
              <div className="font-bebas mb-2" style={{ lineHeight: 0.88 }}>
                <div className="text-white" style={{ fontSize: "clamp(42px,5vw,58px)", letterSpacing: "0.02em", textShadow: "0 0 60px rgba(0,255,180,0.1)" }}>
                  DIABETES
                </div>
                <div style={{ fontSize: "clamp(32px,4vw,46px)", letterSpacing: "0.1em", WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                  PREDICTOR
                </div>
              </div>
              <p className="font-mono-dm" style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}>
                Enter biomarker values for ML-powered risk assessment
              </p>

              {/* loading bar */}
              {loading && (
                <div
                  className="loading-bar absolute bottom-0 left-0 w-full h-0.5"
                  style={{ background: "linear-gradient(90deg, rgba(0,255,180,0.8), rgba(0,180,255,0.8))" }}
                />
              )}
            </div>

            {/* ── FORM BODY ── */}
            <form onSubmit={handleSubmit} className="px-7 pt-5 pb-6">
              <div className="grid grid-cols-2 gap-3 mb-5">
                {fields.map(field => (
                  <div
                    key={field.key}
                    className={`field-group relative${field.key === "DiabetesPedigreeFunction" ? " col-span-2" : ""}`}
                  >
                    {/* label row */}
                    <div className="flex justify-between items-center mb-1.5">
                      <span
                        className="field-label font-mono-dm uppercase tracking-widest transition-colors duration-200"
                        style={{ fontSize: "8.5px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em" }}
                      >
                        {field.label}
                      </span>
                      <span className="font-mono-dm italic" style={{ fontSize: "8px", color: "rgba(255,255,255,0.18)" }}>
                        {field.unit}
                      </span>
                    </div>
                    <input
                      className="field-input w-full font-mono-dm transition-all duration-200 rounded-sm"
                      type="number"
                      name={field.key}
                      placeholder="—"
                      value={data[field.key]}
                      onChange={handleChange}
                      required
                      step="any"
                      style={{
                        padding: "10px 12px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#fff",
                        fontSize: "13px",
                        letterSpacing: "0.04em",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* divider */}
              <div className="h-px mb-5" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

              {/* submit button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-shimmer relative w-full overflow-hidden rounded-sm font-bebas tracking-widest text-white transition-all duration-300 disabled:opacity-60"
                style={{
                  padding: "15px",
                  fontSize: "19px",
                  letterSpacing: "0.24em",
                  background: "transparent",
                  border: "1px solid rgba(0,255,180,0.32)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(0,255,180,0.65)";
                  e.currentTarget.style.boxShadow = "0 0 28px rgba(0,255,180,0.12)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(0,255,180,0.32)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="relative z-10 flex items-center justify-center gap-2.5">
                  <div
                    className="flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0"
                    style={{ border: "1px solid rgba(0,255,180,0.45)", fontSize: "7px" }}
                  >
                    ▶
                  </div>
                  {loading ? "ANALYZING…" : "RUN PREDICTION"}
                </div>
                {/* inner glow */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, rgba(0,255,180,0) 0%, rgba(0,255,180,0.08) 50%, rgba(0,255,180,0) 100%)" }}
                />
              </button>
            </form>

            {/* ── FOOTER STRIP ── */}
            <div
              className="flex items-center justify-between px-7 py-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.3)" }}
            >
              <span className="font-mono-dm uppercase tracking-widest" style={{ fontSize: "8px", color: "rgba(255,255,255,0.15)" }}>
                Powered by machine learning
              </span>
              <span className="font-mono-dm" style={{ fontSize: "8px", color: "rgba(0,255,180,0.3)", letterSpacing: "0.1em" }}>
                v2.1.0 · PIMA Dataset
              </span>
            </div>

          </div>{/* /card */}
        </div>{/* /left */}

        {/* ════ RIGHT — VISUAL PANEL (hidden on mobile) ════ */}
        <div className="hidden md:block relative flex-1 h-screen overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=90&fit=crop&crop=center"
            alt="Medical visualization"
            style={{ filter: "saturate(0.55) brightness(0.45)" }}
          />
          {/* left-to-right vignette + top/bottom */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(90deg, #07070f 0%, rgba(7,7,15,0.55) 12%, rgba(7,7,15,0.0) 35%), linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 72%, rgba(0,0,0,0.6) 100%)"
          }} />
          {/* teal tint */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 65% 65% at 60% 45%, rgba(0,220,145,0.07) 0%, transparent 70%)",
            mixBlendMode: "screen"
          }} />
          {/* scan lines */}
          <div className="absolute inset-0 pointer-events-none scanlines" />

          {/* corner brackets */}
          <div className="absolute top-5 left-5 w-6 h-6" style={{ borderTop: "1px solid rgba(0,255,180,0.28)", borderLeft: "1px solid rgba(0,255,180,0.28)" }} />
          <div className="absolute bottom-5 right-5 w-6 h-6" style={{ borderBottom: "1px solid rgba(0,255,180,0.28)", borderRight: "1px solid rgba(0,255,180,0.28)" }} />

          {/* caption */}
          <div className="absolute bottom-10 right-8 text-right">
            <div className="font-mono-dm uppercase mb-2" style={{ fontSize: "8px", letterSpacing: "0.28em", color: "rgba(0,255,180,0.42)" }}>
              PIMA Indians Dataset
            </div>
            <div className="font-bebas" style={{ fontSize: "clamp(32px,3.5vw,46px)", lineHeight: 0.88, color: "rgba(255,255,255,0.82)", letterSpacing: "0.05em", textShadow: "0 4px 40px rgba(0,0,0,0.9)" }}>
              KNOW YOUR<br />RISK SCORE
            </div>
            <div className="ml-auto mt-2.5 mb-2.5 h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,180,0.45))" }} />
            <div className="font-mono-dm" style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em" }}>
              Early detection saves lives
            </div>
          </div>
        </div>

      </div>
    </>
  );
}