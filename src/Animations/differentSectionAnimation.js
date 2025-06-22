import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateDifferentSection = (refs) => {
  const {
    sectionRef,
    headingRef,
    subheadingRef,
    cardRefs,
    boxRefs,
  } = refs;

  const ctx = gsap.context(() => {
    // Heading & Subheading animation
    gsap.from([headingRef.current, subheadingRef.current], {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      stagger: 0.2
    });

    // Cards animation
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.3,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play reverse play reverse',
      },
    });

    // Description boxes animation
    gsap.from(boxRefs.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play reverse play reverse',
      },
    });
  }, sectionRef);

  return ctx;
};
