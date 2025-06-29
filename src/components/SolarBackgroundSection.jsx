import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgImage from '../assets/images/night.png';
import SolarButton from './SolarButton';

gsap.registerPlugin(ScrollTrigger);

export default function SolarBackgroundSection({ openModal }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center px-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />

      {/* Text Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl text-center text-white space-y-6"
      >
        <h2 className="text-heading font-bold">
          Let’s <span>Solarize India,</span> One Home at a Time
        </h2>

        <p className="text-subheading text-yellow font-bold">
          Ready to start your own solar story?
        </p>

        <p className="text-para">
          Take our free assessment, get answers to all your doubts, and make an informed decision that saves money and lights up your home.
        </p>

        <SolarButton onClick={openModal}>
          Get Your Free Solar Savings Report
        </SolarButton>
      </div>
    </div>
  );
}
