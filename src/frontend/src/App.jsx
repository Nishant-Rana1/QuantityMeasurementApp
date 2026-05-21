import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";
import PageSkeleton from "./components/ui/PageSkeleton.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const Welcome = lazy(() => import("./pages/Welcome/Welcome.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
const Converter = lazy(() => import("./pages/Converter/Converter.jsx"));
const Calculator = lazy(() => import("./pages/Calculator/Calculator.jsx"));
const Comparison = lazy(() => import("./pages/Comparison/Comparison.jsx"));
const ErrorPage = lazy(() => import("./pages/Error/ErrorPage.jsx"));
const NotFound = lazy(() => import("./pages/Error/NotFound.jsx"));

function PageFrame({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const eraseCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    const token = getCookie("mp_token");
    if (token) {
      const name = getCookie("mp_name") || "";
      const email = getCookie("mp_email") || "";
      const picture = getCookie("mp_picture") || "";

      login({ token, name, email, picture });

      // Erase cookies from browser
      eraseCookie("mp_token");
      eraseCookie("mp_name");
      eraseCookie("mp_email");
      eraseCookie("mp_picture");

      // Redirect to main workspace
      navigate("/dashboard");
    }
  }, [login, navigate]);

  const isWelcomePage = location.pathname === "/" || location.pathname === "/login";

  // Redirect to Welcome if not authenticated and trying to access other routes
  if (!isAuthenticated && !isWelcomePage) {
    return <Navigate to="/" replace />;
  }

  // Redirect to dashboard if authenticated and trying to access Welcome page
  if (isAuthenticated && isWelcomePage) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <ErrorBoundary>
      {isWelcomePage ? (
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      ) : (
        <DashboardLayout>
          <Suspense fallback={<PageSkeleton />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/dashboard" element={<PageFrame><Dashboard /></PageFrame>} />
                <Route path="/home" element={<Navigate to="/dashboard" replace />} />
                <Route path="/converter" element={<PageFrame><Converter /></PageFrame>} />
                <Route path="/calculator" element={<PageFrame><Calculator /></PageFrame>} />
                <Route path="/comparison" element={<PageFrame><Comparison /></PageFrame>} />
                <Route path="/error" element={<PageFrame><ErrorPage /></PageFrame>} />
                <Route path="*" element={<PageFrame><NotFound /></PageFrame>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </DashboardLayout>
      )}
    </ErrorBoundary>
  );
}

