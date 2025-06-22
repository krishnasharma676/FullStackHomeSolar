// src/hooks/useGsapAnimations.js
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimations = (ref, animationType = 'fade-up') => {
  useLayoutEffect(() => {
    if (!ref.current) return;

    let ctx = gsap.context(() => {
      if (animationType === "fade-up") {
        gsap.from(ref.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
        });
      }

      if (animationType === "fade-left") {
        gsap.from(ref.current, {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
        });
      }

      if (animationType === "zoom-in") {
        gsap.from(ref.current, {
          scale: 0.7,
          opacity: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
          },
        });
      }

      // Add more animation types as needed
    });

    return () => ctx.revert();
  }, []);
};
