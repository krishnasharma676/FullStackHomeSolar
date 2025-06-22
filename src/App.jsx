import { useState } from 'react';
import LandingPage from "./components/LandingPage"
import PageLoader from "./components/Loader"
import SectionSecond from './components/SectionSecond';
import WhoWeAreSection from './components/WhoWeAreSection';
import SolarBenefitsSection from './components/SolarBenefitsSection';
import SolarBackgroundSection from './components/SolarBackgroundSection';
import FreeAssessmentSection from './components/FreeAssessmentSection';
import DifferentSection from './components/DifferentSection';
import TrustMissionSection from './components/TrustMissionSection';
import SaveEarth from './components/SaveEarth';
import Footer from './components/Footer';
function App() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="font-sans">
        {loading && <PageLoader onFinish={() => setLoading(false)} />}
        {!loading && 
        <>
        <div id="main-landing-wrapper">
          <LandingPage />
          <SectionSecond />
        </div>
        <TrustMissionSection/>
        <WhoWeAreSection/>
        <DifferentSection/>
        <FreeAssessmentSection/>
        <SolarBenefitsSection/>
        <SolarBackgroundSection/>
        <SaveEarth/>
        <Footer/>
        </>
        }
    </div>
  )
}

export default App
