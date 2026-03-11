import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Report = ({ result, formData }) => {
  const downloadPDF = async () => {
    const element = document.getElementById("report");
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#06060e"
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
    while (heightLeft > 0) {
      position = -(imgHeight - heightLeft);
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    pdf.save("diabetes_report.pdf");
  };

  const isHighRisk = result.prediction === 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; background: #06060e; font-family: 'DM Mono', monospace; }

        @keyframes rp-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        .rp-pulse-anim { animation: rp-blink 2s ease-in-out infinite; }

        .rp-card-shadow {
          box-shadow:
            0 0 0 1px rgba(0,255,180,0.08),
            0 0 40px rgba(0,255,180,0.04),
            0 40px 90px rgba(0,0,0,0.85);
        }
        .rp-btn-hover:hover {
          box-shadow: 0 0 25px rgba(0,255,180,0.2);
        }

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
        className="flex w-screen min-h-screen bg-[#06060e] items-stretch"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >

        {/* ══ LEFT: Report — full width on mobile, 55% on desktop ══ */}
        <div
          className="w-full min-[769px]:flex-[0_0_55%] flex items-center justify-center
                     p-10 min-h-screen
                     max-[768px]:p-5"
        >
          <div className="w-full">

            {/* ── Report Card ── */}
            <div
              id="report"
              className="rp-card-shadow w-full max-w-[960px] mx-auto
                         bg-[rgba(10,10,20,0.97)] border border-white/[0.08]
                         max-[768px]:max-w-full"
            >

              {/* Header */}
              <div className="px-[90px] pt-[90px] pb-[70px] border-b border-white/[0.06]
                              max-[768px]:px-6 max-[768px]:pt-8 max-[768px]:pb-6">

                {/* Eyebrow */}
                <div
                  className="flex items-center gap-[10px] mb-[18px]
                             text-[23px] tracking-[0.28em] text-[rgba(0,255,180,0.7)]
                             uppercase font-['DM_Mono']
                             max-[768px]:text-[14px] max-[768px]:tracking-[0.15em]"
                >
                  <span
                    className="rp-pulse-anim flex-shrink-0 w-[30px] h-[10px] rounded-[50%]
                               max-[768px]:w-[10px] max-[768px]:h-[10px]"
                    style={{
                      background: isHighRisk ? "#ff5b6e" : "#00ffb4",
                      boxShadow: `0 0 12px ${isHighRisk ? "#ff5b6e" : "#00ffb4"}`
                    }}
                  />
                  Clinical Analysis Report
                </div>

                {/* Title */}
                <div
                  className="font-['Bebas_Neue'] text-[114px] leading-[0.85] text-white mb-[14px]
                             max-[768px]:text-[52px]"
                >
                  DIABETES
                  <span
                    className="block text-transparent text-[50px] tracking-[0.12em]
                               max-[768px]:text-[30px]"
                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
                  >
                    PREDICTION
                  </span>
                </div>

                {/* Subtitle */}
                <div className="text-[35px] text-white/[0.45] font-['DM_Mono']
                                max-[768px]:text-[14px] max-[768px]:leading-[1.5]">
                  ML-Powered Risk Assessment · PIMA Dataset
                </div>
              </div>

              {/* Section: Prediction Result */}
              <div className="px-[50px] py-[34px] border-b border-white/[0.05]
                              max-[768px]:px-6 max-[768px]:py-5">
                <div className="text-[53px] tracking-[0.2em] uppercase text-white/[0.35] mb-[18px] font-['DM_Mono']
                                max-[768px]:text-[13px] max-[768px]:mb-3">
                  Prediction Result
                </div>
                <div
                  className="inline-flex items-center gap-[14px] px-6 py-[14px]
                             border border-[rgba(0,255,180,0.3)] bg-[rgba(0,255,180,0.08)]
                             max-[768px]:px-4 max-[768px]:py-3"
                >
                  <span
                    className="font-['Bebas_Neue'] text-[32px] tracking-[0.18em]
                               max-[768px]:text-[22px]"
                    style={{ color: isHighRisk ? "#ff7b8a" : "#00ffb4" }}
                  >
                    {isHighRisk ? "HIGH RISK" : "LOW RISK"}
                  </span>
                </div>
              </div>

              {/* Section: Biomarker Values */}
              <div className="px-[50px] py-[34px] border-b border-white/[0.05]
                              max-[768px]:px-6 max-[768px]:py-5">
                <div className="text-[53px] tracking-[0.2em] uppercase text-white/[0.35] mb-[18px] font-['DM_Mono']
                                max-[768px]:text-[13px] max-[768px]:mb-3">
                  Biomarker Values
                </div>
                <table className="w-full border-collapse">
                  <tbody>
                    {Object.entries(formData).map(([key, value]) => (
                      <tr key={key} className="border-b border-white/[0.04] last:border-0">
                        <td
                          className="py-4 text-[43px] tracking-[0.15em] uppercase text-white/[0.35] font-['DM_Mono']
                                     max-[768px]:py-2 max-[768px]:text-[12px] max-[768px]:tracking-[0.08em]"
                        >
                          {key.replace(/([A-Z])/g, " $1")}
                        </td>
                        <td
                          className="py-4 text-[43px] text-right text-white font-['DM_Mono']
                                     max-[768px]:py-2 max-[768px]:text-[12px]"
                        >
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Section: Summary */}
              <div className="px-[50px] py-[34px] border-b border-white/[0.05]
                              max-[768px]:px-6 max-[768px]:py-5">
                <div className="text-[33px] tracking-[0.2em] uppercase text-white/[0.35] mb-[18px] font-['DM_Mono']
                                max-[768px]:text-[13px] max-[768px]:mb-3">
                  Summary
                </div>
                <p className="text-[33px] leading-[1.8] text-white/[0.65] font-['DM_Mono']
                              max-[768px]:text-[13px] max-[768px]:leading-[1.6]">
                  {result.result}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between px-[50px] py-5 bg-black/30
                              max-[768px]:px-6 max-[768px]:py-3 max-[768px]:flex-col max-[768px]:gap-1">
                <span className="text-[22px] text-white/[0.25] font-['DM_Mono']
                                 max-[768px]:text-[11px]">
                  Auto Generated Medical Report
                </span>
                <span className="text-[22px] text-[rgba(0,255,180,0.4)] font-['DM_Mono']
                                 max-[768px]:text-[11px]">
                  v2.1 · PIMA Dataset
                </span>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={downloadPDF}
              className="rp-btn-hover w-full mt-[22px] px-6 py-6
                         font-['Bebas_Neue'] text-[28px] tracking-[0.2em]
                         bg-transparent border border-[rgba(0,255,180,0.35)]
                         text-white cursor-pointer transition-all duration-300
                         hover:border-[#00ffb4]
                         max-[768px]:py-4 max-[768px]:text-[20px]"
            >
              Download PDF Report
            </button>
          </div>
        </div>

        {/* ══ RIGHT: Visual Panel — desktop only ══ */}
        <div className="hidden min-[769px]:flex flex-1 relative">
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

export default Report;