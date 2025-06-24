import { post } from '../utils/api';
import { useState, useRef, useEffect } from 'react';
import solarBuilding from '../assets/images/image-2.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await post('/api/trackSolarDevice', {
        name: 'Krishna Sharma',
        email: 'krishna@example.com',
        bill: 2500,
      });
      console.log('Response:', res);
    } catch (err) {
      console.error('Failed to hit backend:', err.message);
    }
    setLoading(false);
  };

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
            className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-lg"
          />
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col gap-6 text-white">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            Is Solar <span className="text-green">Work</span> For You ?
          </h2>

          <p
            ref={para1Ref}
            className="text-lg leading-relaxed text-white/90"
          >
            We help homeowners and businesses confidently transition to clean energy — with zero confusion, only clarity.
          </p>

          <span
            ref={spanRef}
            className="text-yellow text-lg font-semibold uppercase tracking-wider"
          >
            Let’s Find Out Together
          </span>

          <p
            ref={para2Ref}
            className="text-lg leading-relaxed text-white/90"
          >
            Take a free, no-obligation assessment to see if solar is right for you.
          </p>

          <button
            ref={buttonRef}
            onClick={handleClick}
            disabled={loading}
            className="mt-2 bg-yellow text-black font-bold px-6 py-3 rounded-full w-fit hover:bg-white hover:text-black transition-all duration-300"
          >
            {loading ? 'Loading...' : 'Get My Free Assessment'}
          </button>
        </div>
      </div>
    </section>
  );
}
