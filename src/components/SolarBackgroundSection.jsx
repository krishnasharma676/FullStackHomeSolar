import bgImage from '../assets/images/night.png';
import SolarButton from './SolarButton';

export default function SolarBackgroundSection() {
  return (
    <div
      className="relative w-full h-screen flex items-center justify-center px-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 🔲 Black Overlay with Blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />

      {/* ✅ Text Content */}
      <div className="relative z-10 max-w-4xl text-center text-white space-y-6">
        <h2 className="text-heading font-bold">
          Let’s <span>Solarize India,</span> One Home at a Time
        </h2>

        <p className="text-subheading text-yellow font-bold">
          Ready to start your own solar story?
        </p>

        <p className="text-para">
          Take our free assessment, get answers to all your doubts, and make an informed decision that saves money and lights up your home.
        </p>

        <SolarButton>
          Get Your Free Solar Savings Report
        </SolarButton>
      </div>
    </div>
  );
}
