import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import yellowRectangle from '../assets/images/Rectangle 4.png';
import lightbulbImage from '../assets/images/greenforest.png';
import { CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TrustMissionSection() {
  const sectionRef = useRef();
  const titleRef = useRef();
  const imageRef = useRef();
  const yellowBoxRef = useRef();
  const textOverlayRef = useRef();
  const missionRef = useRef();
  const bulletRef1 = useRef();
  const bulletRef2 = useRef();
  const quoteRef = useRef();

  useEffect(() => {
     const slideIn = gsap.fromTo(
    sectionRef.current,
    { x: -200, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play reverse play reverse',
        // markers: true, // enable this for debugging
      },
    }
  );
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        });

      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        });

      gsap.fromTo(yellowBoxRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: yellowBoxRef.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        });

      gsap.fromTo(textOverlayRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: yellowBoxRef.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        });

      gsap.fromTo(missionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: missionRef.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        });

      gsap.fromTo([bulletRef1.current, bulletRef2.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: bulletRef1.current,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        });

      gsap.fromTo(quoteRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        });
    }, sectionRef);

    return () => {
      ctx.revert()
      slideIn.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full py-[40px] flex flex-col items-center text-center gap-10">
      <h2 ref={titleRef} className="text-2xl text-heading font-bold">
        A Mission Born From a <span className='text-green'>Simple Truth</span>
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-5xl w-full">
        <img
          ref={imageRef}
          src={lightbulbImage}
          alt="Green Lightbulb"
          className="w-[300px] md:w-[250px] object-contain"
        />

        <div ref={yellowBoxRef} className="relative w-[300px] md:w-[400px]">
          <img
            src={yellowRectangle}
            alt="Yellow Trust Text Box"
            className="w-full object-contain"
          />

          <div ref={textOverlayRef} className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <p className="text-Para md:text-base font-semibold text-black leading-relaxed">
              Have you heard stories about unreliable solar companies, pushy salespeople,
              and hidden costs?
            </p>
            <p className="text-Para md:text-base font-semibold text-black leading-relaxed mt-4">
              You want to go solar, but <span className="text-green">TRUST</span> is hard to come by?
            </p>
          </div>
        </div>
      </div>

      <p className="text-subHeading text-yellow max-w-2xl leading-7">
        That’s where <span className="font-bold">The Solar Home</span> steps in.
      </p>

      <div ref={missionRef}>
        <p className="font-bold text-heading mb-10">Our <span className='text-green'>Mission</span></p>
        <p className="text-yellow font-bold text-subHeading">
          Make going solar as easy as flipping a switch
        </p>
      </div>

      <div className="flex flex-col gap-4 text-Para items-center max-w-xl w-full mt-4 text-left">
        <div ref={bulletRef1} className="flex gap-3">
          <CheckCircle className="text-green mt-1" size={20} />
          <p>Provide clear, fact-based tools to empower your decision</p>
        </div>
        <div ref={bulletRef2} className="ml-[25px] flex gap-3">
          <CheckCircle className="text-green mt-1" size={20} />
          <p>Connect homeowners with verified, local solar professionals</p>
        </div>
      </div>

      <p ref={quoteRef} className="italic text-Para mt-6 border-b border-white pb-2 max-w-xl">
        “We’re not just helping you choose your solar partner, we’re building trust.”
      </p>
    </div>
  );
}
