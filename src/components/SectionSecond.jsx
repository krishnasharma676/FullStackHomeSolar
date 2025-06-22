import { post } from '../utils/api';
import { useState, useRef, useEffect } from 'react';
import solarBuilding from '../assets/images/image-2.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionSecond() {
  const [loading, setLoading] = useState(false);

  // Refs for animation
  const sectionRef = useRef();
  const headingRef = useRef();
  const para1Ref = useRef();
  const spanRef = useRef();
  const para2Ref = useRef();
  const buttonRef = useRef();
  const imageRef = useRef();

  // Animate on scroll in/out
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
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
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
    <div className=" relative z-20 flex py-[40px] flex-col z-20 gap-10 min-w-screen" ref={sectionRef}>
      <div className="max-w-[1200px] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[0.5fr_1.8fr] gap-12">
          {/* Left Content */}
          <div className="flex flex-col gap-10 items-center justify-start">
            <h1
              ref={headingRef}
              className="text-heading font-bold text-center leading-[1.3]"
            >
              Can <br />
              <span className="text-green">
                Solar <br />
                Work <br />
              </span>
              For You?
            </h1>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-5">
            <p
              ref={para1Ref}
              className="text-Para leading-[40px] text-white"
            >
              We help homeowners and businesses like yours, confidently transition to solar,
              by turning confusion into clarity, guiding you at every step of the way
            </p>
            <span
              ref={spanRef}
              className="text-green  text-Para font-bold"
            >
              You Are Not Alone
            </span>
            <p
              ref={para2Ref}
              className="text-Para leading-[40px] text-white"
            >
              We Invite You To Take A Free And Fact Based Assessment
            </p>
            <button
              ref={buttonRef}
              className="w-fit bg-yellow font-bold px-6 py-4 rounded-full text-para hover:bg-white hover:text-black transition"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Click Here To Find Out How?'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Image */}
      <img
        ref={imageRef}
        src={solarBuilding}
        alt="Solar Building"
        className="max-w-full h-auto"
      />
    </div>
  );
}
