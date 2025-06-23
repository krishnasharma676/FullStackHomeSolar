import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="">
      <div className="w-full border-t border-gray-700 mb-10" />
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-subHeading font-bold text-green">TheSolarHome</h1>
          <p className="text-Para text-white">
            Empowering India with clean energy solutions that are transparent, affordable, and built on trust.
          </p>
        </div>

        <div>
          <h3 className="text-subHeading font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm ">
            <li><a href="#home" className="hover:text-green transition">Home</a></li>
            <li><a href="#calculator" className="hover:text-green transition">Solar Calculator</a></li>
            <li><a href="#about" className="hover:text-green transition">About Us</a></li>
            <li><a href="#contact" className="hover:text-green transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-subHeading font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm ">
            <li className="flex items-center gap-2"><Phone size={16} /> +91 9876543210</li>
            <li className="flex items-center gap-2"><Mail size={16} /> hello@thesolarhome.in</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> New Delhi, India</li>
          </ul>
        </div>


        <div>
          <h3 className="text-subHeading font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-white">
            <a href="#"><Facebook className="hover:text-green transition" /></a>
            <a href="#"><Instagram className="hover:text-green transition" /></a>
            <a href="#"><Twitter className="hover:text-green transition" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
