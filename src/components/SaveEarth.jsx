import sun from '../assets/images/sun.gif'
import flower from '../assets/images/flower.gif'
import middlesun from '../assets/images/middlesun.gif'
export default function SaveEarth() {
  return (
    <section className="w-full py-16 px-4 md:px-12 flex flex-col items-center text-center">
      {/* Section Heading */}
      <h2 className="text-heading text-2xl text-heading font-bold mb-12">
        How <span className="text-green">Solar Power</span> Works for You
      </h2>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {/* 🔌 Current GIF */}
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
          <img
            src={sun}
            alt="Electric Current"
            className="w-[80px] h-[80px] object-contain mix-blend-multiply
"
          />
          <h3 className="font-bold text-subHeading text-gray-800">Capture Energy</h3>
          <p className="text-Para text-sm text-gray-600">
            Solar panels absorb sunlight and convert it into usable electricity instantly.
          </p>
        </div>

        {/* 🌞 Sun GIF */}
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
          <img
            src={middlesun}
            alt="Sun Power"
            className="w-[80px] h-[80px] object-contain mix-blend-multiply
"
          />
          <h3 className="font-bold text-subHeading text-gray-800">Power from the Sun</h3>
          <p className="text-Para text-sm text-gray-600">
            The sun's rays provide clean, renewable energy without pollution or noise.
          </p>
        </div>

        {/* 🌻 Flower GIF */}
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
          <img
            src={flower}
            alt="Green Growth"
            className="w-[80px] h-[80px] object-contain mix-blend-multiply
"
          />
          <h3 className="font-bold text-subHeading text-gray-800">Grow Sustainably</h3>
          <p className="text-Para text-sm text-gray-600">
            Go green and watch your impact bloom—saving money and the planet.
          </p>
        </div>
      </div>
    </section>
  );
}
