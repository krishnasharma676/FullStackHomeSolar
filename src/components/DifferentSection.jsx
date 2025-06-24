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
    <div
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-10 py-12 gap-12 text-center"
    >
      {/* Heading & Subheading */}
      <div className="max-w-3xl space-y-4">
        <h2 ref={headingRef} className="text-3xl md:text-4xl text-heading font-bold">
          What Makes Us <span className="text-green">Different?</span>
        </h2>

        <p ref={subheadingRef} className="text-base md:text-lg text-Para leading-7">
          Do you hesitate to go solar because of one word: <span className="text-yellow font-bold">Trust</span>?<br />
          The fear of being misled or spammed with calls held you back.<br />
          That’s why <span className="text-yellow font-bold">TheSolarHome</span> is built on three pillars:
        </p>
      </div>

      {/* Icon Cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
            className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-3"
          >
            <card.Icon className="w-8 h-8 text-green" />
            <h3 className="text-base md:text-lg font-semibold text-subHeading text-black">{card.title}</h3>
            <p className="text-sm md:text-base text-Para text-black">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Yellow Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {[
          "Every installer we recommend passes a rigorous 5-step verification process.",
          "We analyze your usage & grid rates to maximize savings.",
          "Your data is shared only when you choose, and with your permission."
        ].map((text, idx) => (
          <div
            key={idx}
            ref={(el) => boxRefs.current[idx] = el}
            className="bg-yellow text-black p-5 rounded-md font-semibold text-sm md:text-base leading-6"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
