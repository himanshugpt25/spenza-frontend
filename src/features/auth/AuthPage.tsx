import { Navigate, useNavigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import { useAuth } from "../../context/AuthContext";
import { ScreenLoader } from "../../components/ui/ScreenLoader";

type AuthMode = "login" | "signup";

type AuthPageProps = {
  initialMode?: AuthMode;
};

const modeCopy: Record<AuthMode, { title: string; subtitle: string }> = {
  login: {
    title: "Welcome back",
    subtitle: "Sign in to manage subscriptions and event streams.",
  },
  signup: {
    title: "Create an account",
    subtitle: "Spin up your Spenza workspace in minutes.",
  },
};

export const AuthPage = ({ initialMode = "login" }: AuthPageProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, status } = useAuth();
  const mode = initialMode;

  if (status === "loading") {
    return <ScreenLoader label="Validating your session..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const copy = modeCopy[mode];

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
      <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 shadow-2xl shadow-slate-950/50 sm:p-12">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.5em] text-sky-300">
              Spenza
            </p>
            <h1 className="text-4xl font-semibold text-white">{copy.title}</h1>
            <p className="text-lg text-slate-300">{copy.subtitle}</p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                Unified subscription lifecycle management
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                Real-time webhook visibility
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                Secure JWT auth backed by refresh tokens
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/40">
            <div className="mb-6 flex items-center gap-2 rounded-full bg-white/10 p-1 text-sm font-semibold text-white/60">
              <button
                type="button"
                className={`flex-1 rounded-full px-4 py-2 transition ${
                  mode === "login"
                    ? "bg-slate-900 text-white shadow shadow-slate-900/40"
                    : "hover:text-white"
                }`}
                onClick={() => {
                  navigate("/");
                }}
              >
                Sign in
              </button>
              <button
                type="button"
                className={`flex-1 rounded-full px-4 py-2 transition ${
                  mode === "signup"
                    ? "bg-slate-900 text-white shadow shadow-slate-900/40"
                    : "hover:text-white"
                }`}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Create account
              </button>
            </div>
            {mode === "login" ? (
              <LoginPage onSuccess={() => navigate("/dashboard")} />
            ) : (
              <SignupPage onSuccess={() => navigate("/dashboard")} />
            )}
            <p className="mt-6 text-center text-sm text-slate-400">
              Need help?{" "}
              <a
                href="https://spenza.com/support"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-sky-300 hover:text-sky-200"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
