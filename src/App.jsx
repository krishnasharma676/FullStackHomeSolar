import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from "./components/LandingPage";
import PageLoader from "./components/Loader";
import SectionSecond from './components/SectionSecond';
import WhoWeAreSection from './components/WhoWeAreSection';
import SolarBenefitsSection from './components/SolarBenefitsSection';
import SolarBackgroundSection from './components/SolarBackgroundSection';
import FreeAssessmentSection from './components/FreeAssessmentSection';
import DifferentSection from './components/DifferentSection';
import TrustMissionSection from './components/TrustMissionSection';
import SaveEarth from './components/SaveEarth';
import Footer from './components/Footer';
import ModalForm from './components/ModalForm';
import Dashboard from './components/Dashboard';

function MainHome() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`font-sans ${showModal ? 'overflow-hidden' : ''}`}>
      {loading && <PageLoader onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <div id="main-landing-wrapper">
            <LandingPage openModal={() => setShowModal(true)} />
            <SectionSecond />
          </div>
          <TrustMissionSection />
          <WhoWeAreSection />
          <DifferentSection />
          <FreeAssessmentSection />
          <SolarBenefitsSection />
          <SolarBackgroundSection />
          <SaveEarth />
          <Footer />
        </>
      )}
      {showModal && <ModalForm onClose={() => setShowModal(false)} />}
    </div>
    // <Dashboard/>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
