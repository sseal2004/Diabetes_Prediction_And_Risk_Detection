import React, { useState } from "react";
import DiabetesForm from "./components/DiabetesForm";
import Report from "./components/Report";

function App() {
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black overflow-hidden relative">
      {/* Sexy Animated Background */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-purple-500/5 animate-pulse" />
      
      {/* Main Content - No Extra Space */}
      <div className="relative z-10 pt-0 pb-12">
        {!result ? (
          <DiabetesForm setResult={setResult} setFormData={setFormData} />
        ) : (
          <Report result={result} formData={formData} />
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-6px) rotateX(1deg); }
        }
        
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .bg-grid-white\\/\\[0.03\\] {
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at 20% 80%, rgba(0,255,180,0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(168,85,247,0.15) 0%, transparent 50%);
        }
      `}</style>
    </div>
  );
}

export default App;
