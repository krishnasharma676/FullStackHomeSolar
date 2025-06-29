import { useRef } from 'react';
import { ShieldCheck, Star, Eye } from 'lucide-react';

export default function DifferentSection() {
  const cardRefs = useRef([]);
  const boxRefs = useRef([]);

  const cards = [
    {
      Icon: ShieldCheck,
      title: 'Trust First',
      desc: 'We put transparency and integrity at the heart of every interaction.',
    },
    {
      Icon: Star,
      title: 'Expertise That Saves',
      desc: 'Leverage years of solar experience to save money and energy.',
    },
    {
      Icon: Eye,
      title: 'Privacy, Our Promise',
      desc: 'We never sell or misuse your data. Your trust is our commitment.',
    },
  ];

  const highlights = [
    "Every installer we recommend passes a rigorous 5-step verification process, ensuring only the best work on your home.",
    "Our team analyses your electricity usage and local grid rates to design a solar system that maximizes your savings.",
    "You control your information. Share it only when you’re ready, and only with the installers you choose.",
  ];

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-10 py-6 gap-8 text-center ">
      {/* Heading & Subheading */}
      <div className="max-w-3xl space-y-4">
        <h2 className="text-heading font-bold">
          What Makes Us <span className="text-green">Different?</span>
        </h2>
        <p className="text-para text-gray-300">
          Do you hesitate to go solar because of one word:{' '}
          <span className="text-yellow font-bold">Trust</span>?<br />
          The fear of being misled or spammed with calls held you back.
        </p>
        <p className="text-para text-gray">
          We get it, and that’s why{' '}
          <span className="text-yellow font-bold">TheSolarHome</span> is built on three pillars:
        </p>
      </div>

      {/* Icon Cards - Dark Theme */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="bg-[#111418] border border-[#222] hover:border-yellow text-white p-6 rounded-2xl shadow-[0_0_25px_#00000066] hover:shadow-yellow/20 transition-all duration-300 text-center backdrop-blur-sm"
          >
            {/* Icon */}
            <div className="flex justify-center items-center w-14 h-14 rounded-full bg-yellow-500/10 border border-yellow mb-4 mx-auto">
              <card.Icon className="w-7 h-7 text-yellow" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-green mb-2">{card.title}</h3>

            {/* Description */}
            <p className="text-sm text-gray leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Yellow Cards */}
      <div className="w-full max-w-6xl bg-gray-100 rounded-xl p-3 md:p-5 shadow-lg text-black text-left">
        <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
          {highlights.map((text, idx) => (
            <li key={idx} ref={(el) => (boxRefs.current[idx] = el)}>
              {text}
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
}
