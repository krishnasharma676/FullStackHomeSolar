import solarPanel from '../assets/images/panal-image.png'; // update path if needed

export default function SolarBenefitsSection() {
  return (
    <section className="w-full h-screen flex items-center justify-center px-4 md:px-12 text-white">
      <div className="flex flex-col items-center w-full max-w-7xl gap-12">
        {/* 🟨 Section Title */}
        <h1 className="text-heading text-center font-bold">
          India’s <span className="text-green">TheSolarHome</span> Promise
        </h1>

        {/* 🧱 Grid Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 items-center text-center">
          {/* 💡 Top Left */}
          <div className="flex flex-col gap-3 px-4">
            <h3 className="text-yellow font-bold text-subHeading">Best Value</h3>
            <p className="text-para">
              Customized solutions for your home's specific needs and budget
            </p>
          </div>

          {/* 🌞 Center Image */}
          <div className="row-span-2 flex justify-center items-center">
            <img
              src={solarPanel}
              alt="Solar Panel Center"
              className="w-[250px] md:w-[400px] h-auto object-contain"
            />
          </div>

          {/* 💡 Top Right */}
          <div className="flex flex-col gap-3 px-4">
            <h3 className="text-yellow font-bold text-subheading">Range of Solutions</h3>
            <p className="text-para">
              From budget-friendly panels to premium systems, matching your family's goals
            </p>
          </div>

          {/* 💡 Bottom Left */}
          <div className="flex flex-col gap-3 px-4">
            <h3 className="text-yellow font-bold text-subheading">Full Support</h3>
            <p className="text-para">
              With you every step of the way, from consultation to installation and beyond
            </p>
          </div>

          {/* 💡 Bottom Right */}
          <div className="flex flex-col gap-3 px-4">
            <h3 className="text-yellow font-bold text-subheading">Community</h3>
            <p className="text-para">
              Join our community and share your solar story with neighbours and friends
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
