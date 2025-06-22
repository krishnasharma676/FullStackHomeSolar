import gsap from 'gsap';

export function animateLandingPage({ headingRef, paraRef, buttonRef, imageRef, containerRef }) {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(headingRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
    })
      .from(paraRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
      }, "-=0.6")
      .from(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        x: 50,
        duration: 1,
      }, "-=0.8");
  }, containerRef);

  return ctx; // So you can call ctx.revert() for cleanup
}
