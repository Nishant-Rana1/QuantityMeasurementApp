import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { CheckCircle2, Scale3d, Calculator, SquareCode, Zap } from "lucide-react";

export default function Welcome() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = () => {
    // Redirect to Spring Boot OAuth2 authorization endpoint
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Left Pane: Brand & Features Info */}
      <div className="relative flex-1 flex flex-col justify-between p-8 md:p-16 lg:p-24 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white overflow-hidden">
        {/* Decorative Glowing Orbs */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-500/30 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-500/30 blur-[100px] pointer-events-none" />

        {/* Top Header branding */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/20">
            <SquareCode size={22} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">MeasurePro</span>
        </div>

        {/* Feature Text Section */}
        <div className="relative z-10 my-auto py-12 md:py-0 space-y-8 max-w-lg">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-sm border border-white/10">
              <Zap size={12} className="text-amber-300 fill-amber-300" />
              Real-time High Precision Calculations
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Quantity <br />
              <span className="bg-gradient-to-r from-amber-200 to-pink-200 bg-clip-text text-transparent">
                Measurement
              </span>{" "}
              Simplified
            </h1>
            <p className="text-lg text-indigo-100 font-medium">
              A comprehensive system for converting units, executing precision arithmetic operations, and comparing measurements instantly.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-emerald-300 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-base">Multi-Category Support</h3>
                <p className="text-sm text-indigo-100">Convert lengths, volume, temperature, mass, and more with exact physical precision.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-emerald-300 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-base">Interactive Calculator</h3>
                <p className="text-sm text-indigo-100">Perform direct arithmetic (+, -, *, /) directly on different unit quantities.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-emerald-300 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-base">Side-by-Side Comparison</h3>
                <p className="text-sm text-indigo-100">Compare multiple units at a glance with live scaling indicators.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-indigo-200/70">
          © {new Date().getFullYear()} MeasurePro. Crafted for high-precision workflows.
        </div>
      </div>

      {/* Right Pane: Login Card Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-2xl">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              Get Started
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome to MeasurePro. Authenticate to enter your workspace.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            {/* Continue with Google button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3.5 px-5 py-4 border border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow-sm transition-all duration-200 active:scale-[0.98]"
            >
              {/* Google Brand Logo SVG */}
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.17-.23-.3-.48-.39-.75z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <span className="relative px-3 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Workspace Security
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
              All credentials are handled securely via encrypted session tokens.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
