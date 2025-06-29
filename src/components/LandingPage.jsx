import { post } from '../utils/api';
import { useState, useRef, useEffect } from 'react';
import solarBuilding from '../assets/images/solar.gif';
import { animateLandingPage } from '../Animations/landingPageAnimation'
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import SolarButton from './SolarButton';
export default function LandingPage({openModal}) {
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const imageRef = useRef(null);
  const blurRef = useRef();

  useEffect(() => {
    const ctx = animateLandingPage({
      headingRef,
      paraRef,
      imageRef,
      containerRef,
    });
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: false,
      scrub: true, // smooth transition
    });
    const blurTween = gsap.to(blurRef.current, {
      opacity: 0.3,
      filter: 'blur(30px)',
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ctx.revert();
      trigger.kill();
      blurTween.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="py-[40px] min-h-screen flex flex-col gap-6">
      <div ref={blurRef}>
        <h1 ref={headingRef} className="text-heading font-bold">
          India’s <span className="text-[#20b024]">Solar Journey</span> Begins Here
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-12">

          {/* Left Content */}
          <div className="flex flex-col gap-10">
            <p ref={paraRef} className="mt-5 mb-5 text-para leading-[40px] text-white">
              We help homeowners and businesses like yours, confidently transition to solar,
              by turning confusion into clarity, guiding you at every step of the way
            </p>

            <SolarButton onClick={openModal} className='w-[70%]'>
              Get Your Free Solar Savings Report
            </SolarButton>
          </div>


          {/* Right Image */}
          <div className="flex justify-end">
            <img ref={imageRef} src={solarBuilding} alt="Solar Building" className="max-w-full h-auto h-[350px] w-[400px]" />
          </div>
        </div>
      </div>
    </div>
  );

}
