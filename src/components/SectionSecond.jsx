import { useState, useRef, useEffect } from 'react';
import solarBuilding from '../assets/images/second-section.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SolarButton from './SolarButton';

gsap.registerPlugin(ScrollTrigger);

export default function SectionSecond() {
  const [loading, setLoading] = useState(false);

  const sectionRef = useRef();
  const headingRef = useRef();
  const para1Ref = useRef();
  const spanRef = useRef();
  const para2Ref = useRef();
  const buttonRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        headingRef.current,
        para1Ref.current,
        spanRef.current,
        para2Ref.current,
        buttonRef.current,
        imageRef.current,
      ];

      gsap.from(elements, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        scale: 0.97,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="relative z-20 min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side Image */}
        <div className="flex justify-center">
          <img
            ref={imageRef}
            src={solarBuilding}
            alt="Solar Building"
            className="w-full max-w-[] lg:max-w-[17rem] object-contain drop-shadow-lg"
          />
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col gap-6 text-white">
          <h2
            ref={headingRef}
            className="text-heading font-bold leading-tight"
          >
            Can Solar <span className="text-green">Work</span> For You ?
          </h2>

          <p
            ref={para1Ref}
            className="text-para"
          >
            You want to switch to solar, but don’t know where to start, whom to
            trust and how to act?
          </p>

          <span
            ref={spanRef}
            className="text-yellow text-subheading font-semibold uppercase tracking-wider"
          >
            You Are Not Alone
          </span>

          <p
            ref={para2Ref}
            className="text-para"
          >
            We invite you to take a free and fact based assessment
          </p>

          <SolarButton>
            Click Here To Find Out How ?
          </SolarButton>
        </div>
      </div>
    </section>
  );
}
