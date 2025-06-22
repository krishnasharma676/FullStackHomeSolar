import { useEffect, useRef } from 'react';
import { ShieldCheck, Star, Eye } from 'lucide-react';
import { animateDifferentSection } from '../Animations/differentSectionAnimation';

export default function DifferentSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const cardRefs = useRef([]);
  const boxRefs = useRef([]);

  useEffect(() => {
    const ctx = animateDifferentSection({
      sectionRef,
      headingRef,
      subheadingRef,
      cardRefs,
      boxRefs
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full py-[40px] flex flex-col items-center gap-8 text-center">
      <h2 ref={headingRef} className="text-2xl text-heading font-bold">
        What Makes Us <span className="text-green">Different ?</span>
      </h2>

      <p ref={subheadingRef} className="max-w-2xl text-Para leading-7">
        Do you hesitate to go solar because of one word: <span className="text-yellow font-bold">Trust</span>.
        The fear of being misled or spammed with calls held you back.
        <br /><br />
        We get it, and that’s why <span className="text-yellow font-bold">TheSolarHome</span> is built on three pillars:
      </p>

      <div className="w-full bg-white py-5 px-6 rounded-xl shadow-md">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[{
            Icon: ShieldCheck,
            title: "Trust First",
            desc: "We put transparency and integrity at the heart of every interaction.",
          }, {
            Icon: Star,
            title: "Expertise That Saves",
            desc: "Leverage years of solar experience to save money and energy.",
          }, {
            Icon: Eye,
            title: "Privacy, Our Promise",
            desc: "We never sell or misuse your data. Your trust is our commitment.",
          }].map((card, idx) => (
            <div
              key={idx}
              ref={(el) => cardRefs.current[idx] = el}
              className="flex flex-col items-center gap-3 p-6 rounded-lg"
            >
              <card.Icon className="w-8 h-8 text-green" />
              <h3 className="text-base font-semibold text-subHeading text-black">{card.title}</h3>
              <p className="text-Para text-black">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl text-black mt-6">
        {[
          "Every installer we recommend passes a rigorous 5-step verification process, ensuring only the best work on your home.",
          "Our team analyses your electricity usage and local grid rates to design a solar system that maximizes your savings.",
          "You control your information. Share it only when you're ready, and only with the installers you choose."
        ].map((text, idx) => (
          <div
            key={idx}
            ref={(el) => boxRefs.current[idx] = el}
            className="bg-yellow p-6 rounded-md text-Para font-bold leading-6"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
