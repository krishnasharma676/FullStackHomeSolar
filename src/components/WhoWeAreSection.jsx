import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import solarTeamImage from "../assets/images/whoweare.png";

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAreSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full py-[40px] flex flex-col items-center gap-10 px-4 sm:px-6 md:px-10"
    >
      <h2 className="text-heading font-bold text-center">
        Who Are We : <span className="text-green">Your Solar Navigators</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1200px] w-full items-center">
        {/* Left Image */}
        <div ref={imageRef} className="w-full">
          <img
            src={solarTeamImage}
            alt="Solar Team"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>

        {/* Right Text Content */}
        <div ref={contentRef} className="flex flex-col gap-6 w-full text-left">
          <p className="text-para">
            Picture a team of solar enthusiasts, gathered together, fueled by a
            shared passion for sustainability.
          </p>
          <p className="text-yellow text-subheading font-bold">
            That’s us — TheSolarHome
          </p>
          <p className="text-para">
            We’re not just experts; we’re navigators, weaving connections
            between homeowners like you and trusted local solar vendors.
          </p>
          <div className="w-full text-left">
            <div>
              <h3 className="text-yellow font-bold text-subheading mb-2">
                For Homeowners:
              </h3>
              <ul className="list-disc list-inside space-y-4 text-para">
                <li>Access curated local vendors with proven performance</li>
                <li>Learn from verified customer stories and reviews</li>
              </ul>
            </div>

            <div>
              <h3 className="text-yellow font-bold text-subheading my-5">
                For Installers:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-para">
                <li>Grow your business with credible leads</li>
                <li>Build your reputation with genuine reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
