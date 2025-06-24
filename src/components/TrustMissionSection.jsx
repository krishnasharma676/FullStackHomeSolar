import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import yellowRectangle from "../assets/images/para-bg.png";
import lightbulbImage from "../assets/images/greenforest.png";
import { CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function TrustMissionSection() {
  const wrapperRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        x: "-100vw",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          // markers: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="w-screen h-screen overflow-hidden relative text-white"
    >
      <div ref={containerRef} className="flex w-[200vw] h-screen">
        {/* Panel 1 */}
        <div className="w-screen h-screen flex justify-center items-center px-6">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-10">
            {/* Left Side */}
            <div className="flex flex-col items-center md:items-start gap-6 w-full md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-center md:text-left leading-tight">
                A Mission Born From a{" "}
                <span className="text-blue-500">Simple Truth</span>
              </h2>

              <div className="w-full flex justify-center md:justify-start">
                <img
                  src={lightbulbImage}
                  alt="Green Lightbulb"
                  className="w-[250px] md:w-[300px] object-contain"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col items-center md:items-start justify-center gap-4 w-full md:w-1/2">
              <div className="relative w-full h-full">
                <img
                  src={yellowRectangle}
                  alt="Yellow Box"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
                  <p className="text-black font-semibold text-sm md:text-base leading-snug">
                    Have you heard stories about unreliable solar companies,
                    pushy salespeople, and hidden costs?
                  </p>
                  <p className="text-black font-semibold mt-3 text-sm md:text-base leading-snug">
                    You want to go solar, but{" "}
                    <span className="text-green-600">TRUST</span> is hard to
                    come by?
                  </p>
                </div>
              </div>

              {/* Below Text */}
              <p className="text-yellow-400 text-base text-center md:text-left mt-2">
                That’s where <span className="font-bold">TheSolarHome</span>{" "}
                steps in.
              </p>
            </div>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-6 px-6">
          <p className="text-heading font-bold text-center">
            Our <span className="text-green-500">Mission</span>
          </p>
          <p className="text-yellow-400 text-subHeading font-bold text-center">
            Make going solar as easy as flipping a switch
          </p>

          <div className="flex text-subHeading flex-col gap-4 text-base text-green ">
            <div className="flex gap-3 items-start">
              <CheckCircle className="text-green-500 mt-1" size={50} />
              <p>Provide clear, fact-based tools to empower your decision</p>
            </div>
            <div className="flex gap-3 items-center ml-6">
              <CheckCircle className="text-green-500 mt-1" size={50} />
              <p>Connect homeowners with verified, local solar professionals</p>
            </div>
          </div>

          <p className="italic text-subHeading text-white border-b border-gray-300 pb-2 max-w-md text-center mt-6">
            “We’re not just helping you choose your solar partner, we’re
            building trust.”
          </p>
        </div>
      </div>
    </section>
  );
}
