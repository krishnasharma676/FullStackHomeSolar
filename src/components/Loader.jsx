import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import image from '../assets/images/image-6.jpg';

export default function PageLoader({ onFinish }) {
  const loaderRef = useRef();
  const barRef = useRef();
  const letterRefs = useRef([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate each letter in title
    gsap.fromTo(
      letterRefs.current,
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.08,
      }
    );

    // Progress counter logic
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setProgress(count);

      // Animate bar width smoothly
      gsap.to(barRef.current, {
        width: `${count}%`,
        duration: 0.18,
        ease: 'power1.out',
      });

      if (count >= 100) {
        clearInterval(interval);

        // Exit animation
        gsap.to(loaderRef.current, {
          y: '-100%',
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => onFinish(),
        });
      }
    }, 20); // ✅ 100 * 20ms = 2000ms (2 sec total)
  }, [onFinish]);

  // Title string
  const title = 'THE SOLAR HOME';

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-full text-white z-50 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      {/* 🔰 Content */}
      <div className="z-10 flex flex-col items-center justify-center w-full px-6">
        {/* Animated title */}
        <h1 className="flex flex-wrap justify-center gap-2 text-yellow text-heading sm:text-5xl font-extrabold tracking-wider mb-10">
          {title.split('').map((char, i) => (
            <span
              key={i}
              ref={(el) => (letterRefs.current[i] = el)}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Loader bar */}
        <div className="w-full max-w-6xl h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-yellow to-green transition-all duration-200"
            style={{ width: '0%' }}
          ></div>
        </div>

        {/* Percentage */}
        <div className="mt-4 text-base sm:text-lg tracking-wide font-semibold text-white">
          {progress}%
        </div>
      </div>
    </div>
  );
}
