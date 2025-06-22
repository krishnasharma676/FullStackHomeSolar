import solarPanel from '../assets/images/image-7.png'; // update path if needed

export default function SolarBenefitsSection() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center py-12 px-4 md:px-12">
      <div className="flex flex-col items-center w-full">
        {/* 🟨 Section Title */}
        <h1 className="text-heading text-center  font-bold mb-12">
          India’s <span className="text-green">Solar Journey</span> Begins Here
        </h1>

        {/* 🧱 Grid Layout */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-[100px] text-center items-center">
          {/* 💡 Top Left */}
          <div className="flex flex-col gap-3 px-4">
            <h3 className="text-yellow font-bold text-subHeading">Best Value</h3>
            <p className="text-para">
              Customized solutions for your home's specific needs and budget
            </p>
          </div>

          {/* 🌞 Center Image */}
          <div className="row-span-2 flex justify-center items-center md:translate-y-4">
            <img
              src={solarPanel}
              alt="Solar Panel Center"
              className="w-[180px] md:w-[240px] h-auto"
            />
          </div>

          {/* 💡 Top Right */}
          <div className="flex flex-col gap-3 px-4">
            <h3 className="text-yellow font-bold text-subHeading">Range of Solutions</h3>
            <p className="text-para">
              From budget-friendly panels to premium systems, matching your family's goals
            </p>
          </div>

          {/* 💡 Bottom Left */}
          <div className="flex flex-col gap-3 px-4">
            <h3 className="text-yellow font-bold text-subHeading">Full Support</h3>
            <p className="text-para">
              With you every step of the way, from consultation to installation and beyond
            </p>
          </div>

          {/* 💡 Bottom Right */}
          <div className="flex flex-col gap-3 px-4">
            <h3 className="text-yellow font-bold text-subHeading">Community</h3>
            <p className="text-para">
              Join our community and share your solar story with neighbours and friends
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
