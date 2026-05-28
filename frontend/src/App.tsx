import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { Navbar } from './components/shared/Navbar';
import { Footer } from './components/shared/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Wizard from './pages/Wizard';
import Ticket from './pages/Ticket';
import PartyDashboard from './pages/PartyDashboard';
import TermsPage from './pages/Terms';
import SettingsPage from './pages/Settings';
import UserDashboard from './pages/UserDashboard';
import ComingSoon from './pages/ComingSoon';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import ScrollToTop from './components/shared/ScrollToTop';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plan/new" element={<ProtectedRoute><Wizard /></ProtectedRoute>} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/party/:id" element={<PartyDashboard />} />
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Placeholder Routes for Navbar & Footer */}
            <Route path="/search" element={<ComingSoon />} />
            <Route path="/themes" element={<ComingSoon />} />
            <Route path="/venues" element={<ComingSoon />} />
            <Route path="/about" element={<ComingSoon />} />
            <Route path="/pricing" element={<ComingSoon />} />
            <Route path="/careers" element={<ComingSoon />} />
            <Route path="/press" element={<ComingSoon />} />
            <Route path="/vendor-portal" element={<ComingSoon />} />
            <Route path="/vendor-portal/onboarding" element={<ComingSoon />} />
            <Route path="/resources" element={<ComingSoon />} />
            <Route path="/help" element={<ComingSoon />} />
            <Route path="/privacy" element={<ComingSoon />} />
            <Route path="/cookies" element={<ComingSoon />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
