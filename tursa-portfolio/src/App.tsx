import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<PortfolioPage />} />          {/* default = home */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
