import bgImage from '../assets/images/night.png';

export default function SolarBackgroundSection() {
  return (
    <div
      className="w-full py-[40px]] relative flex flex-col items-center justify-start text-white text-center px-6 pt-12 pb-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '140vh',
      }}
    >
      {/* 🔲 Black Blur Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      {/* Text Content */}
      <div className="relative  max-w-2xl w-full flex flex-col gap-6">
        <h2 className="text-white text-3xl md:text-4xl font-bold">
          Let’s Solarize India, One Home at a Time
        </h2>

        <p className="text-white font-semibold text-xl">
          Ready to start your own solar story?
        </p>

        <p className="text-white text-base leading-7">
          Take our free assessment, get answers to all your doubts, and make an informed decision that saves money and lights up your home.
        </p>

        <div>
          <button className="bg-yellow text-black font-bold px-6 py-3 rounded-full mt-4 hover:bg-white hover:text-black transition">
            Get your Solar Assessment Report
          </button>
        </div>
      </div>
    </div>
  );
}
