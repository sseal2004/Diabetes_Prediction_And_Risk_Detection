import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Report({ result, formData }) {
  const isHighRisk = result.prediction === 1;

  const accent      = isHighRisk ? "rgba(255,80,100,0.9)"  : "rgba(0,255,180,0.9)";
  const accentDim   = isHighRisk ? "rgba(255,80,100,0.55)" : "rgba(0,255,180,0.55)";
  const accentGlow  = isHighRisk ? "rgba(255,80,100,0.6)"  : "rgba(0,255,180,0.6)";
  const accentBg    = isHighRisk ? "rgba(255,80,100,0.06)" : "rgba(0,255,180,0.06)";
  const accentBdr   = isHighRisk ? "rgba(255,80,100,0.3)"  : "rgba(0,255,180,0.3)";
  const accentText  = isHighRisk ? "rgba(255,120,130,0.95)": "rgba(0,255,180,0.95)";

  const downloadPDF = async () => {
    const el = document.getElementById("rp-card");
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#0a0a14" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const w = 210;
    const h = canvas.height * w / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, w, h);
    pdf.save("diabetes_report.pdf");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; overflow: hidden; }
        body { font-family: 'DM Mono', monospace; }
        .font-bebas  { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-dm{ font-family: 'DM Mono', monospace; }

        .slim-scroll::-webkit-scrollbar { width: 3px; }
        .slim-scroll::-webkit-scrollbar-track { background: transparent; }
        .slim-scroll::-webkit-scrollbar-thumb { background: rgba(0,255,180,0.2); border-radius: 2px; }

        @keyframes pulsedot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.15; }
        }
        .pulse-dot { animation: pulsedot 2s ease-in-out infinite; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .scanlines {
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
          );
        }

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

        tr { border-bottom: 1px solid rgba(255,255,255,0.04); }
        tr:last-child { border-bottom: none; }
        tr:hover { background: rgba(255,255,255,0.02); }
      `}</style>

      {/* ─── SHELL ─── */}
      <div className="flex w-screen h-screen overflow-hidden" style={{ background: "#06060e" }}>

        {/* ════ LEFT — REPORT PANEL ════ */}
        <div
          className="relative z-10 flex flex-col justify-center w-full md:w-1/2 h-screen overflow-y-auto overflow-x-hidden slim-scroll"
          style={{ background: "#07070f" }}
        >
          {/* ambient */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 10% 10%, rgba(0,255,180,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 90% 90%, rgba(0,150,255,0.04) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 pointer-events-none grid-bg" />

          <div className="relative z-10 mx-4 sm:mx-8 my-4">

            {/* ── CARD ── */}
            <div
              id="rp-card"
              className="rounded-sm overflow-hidden"
              style={{
                background: "rgba(10,10,20,0.98)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: `0 0 0 1px ${accentBdr.replace("0.3","0.08")}, 0 0 40px ${accentBg}, 0 40px 90px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.04)`,
              }}
            >

              {/* HEADER */}
              <div
                className="relative px-7 pt-7 pb-6"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  background: `linear-gradient(135deg, ${accentBg} 0%, transparent 60%)`,
                }}
              >
                <div className="absolute bottom-0 left-7 right-7 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${accentDim}, transparent)` }} />

                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-px flex-shrink-0" style={{ background: accentDim }} />
                  <div
                    className="pulse-dot flex-shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: accent, boxShadow: `0 0 8px ${accentGlow}` }}
                  />
                  <span className="font-mono-dm uppercase" style={{ fontSize: "9px", letterSpacing: "0.28em", color: accentDim }}>
                    Clinical Analysis Report
                  </span>
                </div>

                <div className="font-bebas mb-2" style={{ lineHeight: 0.88 }}>
                  <div className="text-white" style={{ fontSize: "clamp(42px,5vw,58px)", letterSpacing: "0.02em", textShadow: "0 0 60px rgba(0,255,180,0.1)" }}>
                    DIABETES
                  </div>
                  <div style={{ fontSize: "clamp(32px,4vw,46px)", letterSpacing: "0.1em", WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                    PREDICTION
                  </div>
                </div>
                <p className="font-mono-dm" style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}>
                  ML-Powered Risk Assessment · PIMA Dataset
                </p>
              </div>

              {/* RISK BADGE */}
              <div className="px-7 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="font-mono-dm uppercase mb-3" style={{ fontSize: "8px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.28)" }}>
                  Prediction Result
                </div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-sm"
                  style={{ border: `1px solid ${accentBdr}`, background: accentBg }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: accent, boxShadow: `0 0 10px ${accentGlow}` }} />
                  <span className="font-bebas" style={{ fontSize: "22px", letterSpacing: "0.2em", color: accentText }}>
                    {isHighRisk ? "HIGH RISK" : "LOW RISK"}
                  </span>
                </div>
              </div>

              {/* BIOMARKER TABLE */}
              <div className="px-7 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="font-mono-dm uppercase mb-3" style={{ fontSize: "8px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.28)" }}>
                  Biomarker Values
                </div>
                <table className="w-full border-collapse">
                  <tbody>
                    {Object.entries(formData).map(([key, value]) => (
                      <tr key={key} className="transition-colors duration-150">
                        <td className="font-mono-dm uppercase py-2" style={{ fontSize: "8.5px", letterSpacing: "0.16em", color: "rgba(255,255,255,0.3)", width: "55%" }}>
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </td>
                        <td className="font-mono-dm py-2 text-right" style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", letterSpacing: "0.04em" }}>
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SUMMARY */}
              <div className="px-7 py-5">
                <div className="font-mono-dm uppercase mb-3" style={{ fontSize: "8px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.28)" }}>
                  Summary
                </div>
                <p className="font-mono-dm leading-relaxed" style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
                  {result.result}
                </p>
              </div>

              {/* FOOTER STRIP */}
              <div className="flex items-center justify-between px-7 py-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.3)" }}>
                <span className="font-mono-dm uppercase tracking-widest" style={{ fontSize: "8px", color: "rgba(255,255,255,0.15)" }}>
                  Auto-generated
                </span>
                <span className="font-mono-dm" style={{ fontSize: "8px", color: "rgba(0,255,180,0.3)", letterSpacing: "0.1em" }}>
                  v2.1.0 · PIMA Dataset
                </span>
              </div>

            </div>{/* /card */}

            {/* DOWNLOAD BUTTON */}
            <button
              onClick={downloadPDF}
              className="btn-shimmer relative w-full overflow-hidden rounded-sm font-bebas tracking-widest text-white transition-all duration-300 mt-3"
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
                <div className="flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0"
                  style={{ border: "1px solid rgba(0,255,180,0.45)" }}>
                  <svg width="8" height="8" fill="none" stroke="rgba(0,255,180,0.7)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                Download PDF Report
              </div>
            </button>

          </div>
        </div>{/* /left */}

        {/* ════ RIGHT — VISUAL PANEL (hidden on mobile) ════ */}
        <div className="hidden md:block relative flex-1 h-screen overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=90&fit=crop&crop=center"
            alt="Medical visualization"
            style={{ filter: "saturate(0.55) brightness(0.45)" }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(90deg, #07070f 0%, rgba(7,7,15,0.55) 12%, rgba(7,7,15,0.0) 35%), linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 72%, rgba(0,0,0,0.6) 100%)"
          }} />
          <div className="absolute inset-0" style={{
            background: isHighRisk
              ? "radial-gradient(ellipse 65% 65% at 60% 45%, rgba(255,80,100,0.07) 0%, transparent 70%)"
              : "radial-gradient(ellipse 65% 65% at 60% 45%, rgba(0,220,145,0.07) 0%, transparent 70%)",
            mixBlendMode: "screen"
          }} />
          <div className="absolute inset-0 pointer-events-none scanlines" />

          {/* corners */}
          <div className="absolute top-5 left-5 w-6 h-6" style={{ borderTop: `1px solid ${accentBdr}`, borderLeft: `1px solid ${accentBdr}` }} />
          <div className="absolute bottom-5 right-5 w-6 h-6" style={{ borderBottom: `1px solid ${accentBdr}`, borderRight: `1px solid ${accentBdr}` }} />

          {/* caption */}
          <div className="absolute bottom-10 right-8 text-right">
            <div className="font-mono-dm uppercase mb-2" style={{ fontSize: "8px", letterSpacing: "0.28em", color: accentDim }}>
              PIMA Indians Dataset
            </div>
            <div className="font-bebas" style={{ fontSize: "clamp(32px,3.5vw,46px)", lineHeight: 0.88, color: "rgba(255,255,255,0.82)", letterSpacing: "0.05em", textShadow: "0 4px 40px rgba(0,0,0,0.9)" }}>
              YOUR<br />RESULTS
            </div>
            <div className="ml-auto mt-2.5 mb-2.5 h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${accentDim})` }} />
            <div className="font-mono-dm" style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em" }}>
              Early detection saves lives
            </div>
          </div>
        </div>

      </div>
    </>
  );
}