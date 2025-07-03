import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import solarPanel from '../assets/images/panal-image.png';

gsap.registerPlugin(ScrollTrigger);

export default function SolarBenefitsSection() {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate texts
      gsap.from(textRefs.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate image
      gsap.from(imageRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen flex items-center justify-center px-4 md:px-12 text-white"
    >
      <div className="flex flex-col items-center w-full max-w-7xl gap-12">
      
        <h1 className="text-heading text-center font-bold">
          TheSolarHome <span className="text-green">Promise</span>
        </h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 items-center text-center">

          <div
            ref={(el) => (textRefs.current[0] = el)}
            className="flex flex-col gap-3 px-4"
          >
            <h3 className="text-yellow font-bold text-subHeading">Best Value</h3>
            <p className="text-para">
              Customized solutions for your home's specific needs and budget
            </p>
          </div>

          <div className="row-span-2 flex justify-center items-center">
            <img
              ref={imageRef}
              src={solarPanel}
              alt="Solar Panel Center"
              className="w-[280px] md:w-[440px] h-auto object-contain"
            />
          </div>

          <div
            ref={(el) => (textRefs.current[1] = el)}
            className="flex flex-col gap-3 px-4"
          >
            <h3 className="text-yellow font-bold text-subHeading">Range of Solutions</h3>
            <p className="text-para">
              From budget-friendly panels to premium systems, matching your family's goals
            </p>
          </div>


          <div
            ref={(el) => (textRefs.current[2] = el)}
            className="flex flex-col gap-3 px-4"
          >
            <h3 className="text-yellow font-bold text-subHeading">Full Support</h3>
            <p className="text-para">
              With you every step of the way, from consultation to installation and beyond
            </p>
          </div>

          <div
            ref={(el) => (textRefs.current[3] = el)}
            className="flex flex-col gap-3 px-4"
          >
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
