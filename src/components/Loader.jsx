import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo from '../assets/images/logo.svg';

export default function PageLoader({ onFinish }) {
  const loaderRef = useRef();
  const titleRef = useRef();
  const circleRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 20, skewX: 10 },
      {
        opacity: 1,
        y: 0,
        skewX: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.5,
      }
    );

    gsap.to(circleRef.current, {
      rotate: 360,
      duration: 2,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%",
    });

    const timeout = setTimeout(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => onFinish(),
      });
    }, 2500);

    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center text-white bg-gradient-to-br from-black "
    >
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* 🔄 Circular Loader Ring */}
        <div className="relative w-60 h-60 flex items-center justify-center">
          {/* SVG Ring */}
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 100 100"
          >
            <circle
              ref={circleRef}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#FFDD02"
              strokeWidth="4"
              strokeDasharray="282"
              strokeDashoffset="75"
              strokeLinecap="round"
              className="animate-spin-slow"
            />
          </svg>

          {/* Logo */}
          <div className="relative w-32 h-32 animate-pulse">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain brightness-125 contrast-125"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" /> */}
          </div>
        </div>

        {/* Glitch Text */}
        <h1
          ref={titleRef}
          className="relative font-extrabold tracking-widest glitch text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        >
          TheSolarHome
        </h1>
      </div>

      {/* CSS Styles */}
      <style>{`
        .glitch {
          color: #FFFFFF;
          position: relative;
        }
        .glitch::before,
        .glitch::after {
          content: 'TheSolarHome';
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
          background: none;
        }
        .glitch::before {
          color: #20b024;
          top: -2px;
          animation: glitchTop 1s infinite linear alternate-reverse;
        }
        .glitch::after {
          color: #FFDD02;
          top: 2px;
          animation: glitchBottom 1s infinite linear alternate-reverse;
        }

        @keyframes glitchTop {
          0% { clip-path: inset(0 0 80% 0); transform: translate(-2px, -2px); }
          100% { clip-path: inset(0 0 85% 0); transform: translate(2px, 2px); }
        }

        @keyframes glitchBottom {
          0% { clip-path: inset(85% 0 0 0); transform: translate(2px, 2px); }
          100% { clip-path: inset(80% 0 0 0); transform: translate(-2px, -2px); }
        }

        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }

        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
