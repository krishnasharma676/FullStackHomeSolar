import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Send, X } from "lucide-react";
import solarImage from "../assets/images/modal-image.png";
import SolarButton from "./SolarButton";

export default function ModalForm({ onClose }) {
  const navigate = useNavigate();

  const questions = [
    {
      id: "name",
      label: "Your Full Name?",
      description: "So we know whom we are talking to",
      required: true,
      buttonText: "Nice to meet you!",
    },
    {
      id: "email",
      label: "What's your email?",
      description: "We'll send your solar savings report here.",
      required: true,
      buttonText: "Send it here!",
    },
    {
      id: "bill",
      label: "What's your average monthly electricity bill (in ₹)?",
      description: "Provide average of your last 12 months.",
      required: true,
      buttonText: "Let's bring it down!",
    },
    {
      id: "roofArea",
      label: "Available shadow-free rooftop area (sqft)?",
      description: "Helps check if your roof is solar-ready.",
      required: false,
      buttonText: "Here it is",
    },
    {
      id: "location",
      label: "What's your address or pincode?",
      description: "Used to analyze roof and solar potential.",
      required: false,
      buttonText: "Added!",
    }
  ];

  const validationRules = {
    name: { regex: /^[a-zA-Z\s]{3,50}$/, message: "Enter a valid name." },
    email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Invalid email." },
    bill: { regex: /^\d{2,7}$/, message: "Enter a valid bill amount." },
    currentYear: { regex: /^20[2-9]\d$/, message: "Use 2025 or later." },
    perUnitRate: { regex: /^(\d+)(\.\d{1,2})?$/, message: "Example: 7.5" },
    yoyIncrease: { regex: /^([0-9]|[1-9][0-9])$/, message: "0-99%" },
    roofArea: { regex: /^\d{1,6}$/, message: "Max 6 digits" },
    location: { regex: /^.{4,100}$/, message: "Too short/long location" },
    latitude: { regex: /^-?\d{1,2}\.\d+$/, message: "Example: 28.6" },
    longitude: { regex: /^-?\d{1,3}\.\d+$/, message: "Example: 77.2" },
    investOption: { regex: /^(sip|fd)$/i, message: "Enter SIP or FD" },
    systemSize: { regex: /^\d+(\.\d{1,2})?$/, message: "Ex: 3.2" },
  };

  const [step, setStep] = useState(-1);
  const [payload, setPayload] = useState({});
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const questionRef = useRef(null);

  const handleChange = (e) => {
    setPayload({ ...payload, [questions[step].id]: e.target.value });
    if (error) setError("");
  };

  const animateIn = () => {
    gsap.fromTo(
      questionRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  };

  const animateOut = (direction, callback) => {
    gsap.to(questionRef.current, {
      opacity: 0,
      x: direction === "next" ? -100 : 100,
      duration: 0.3,
      ease: "power2.in",
      onComplete: callback,
    });
  };

  const validateAndNext = () => {
    const current = questions[step];
    const value = payload[current.id]?.trim();

    if (current.required && !value) return setError("This field is required.");

    const rule = validationRules[current.id];
    if (rule && value && !rule.regex.test(value)) {
      return setError(rule.message);
    }

    animateOut("next", () => setStep((prev) => prev + 1));
  };

  const back = () => {
    if (step > 0) {
      setError("");
      animateOut("back", () => setStep((prev) => prev - 1));
    }
  };

  const handleSubmit = async () => {
    const current = questions[step];
    const value = payload[current.id]?.trim();

    if (current.required && !value) return setError("This field is required.");
    const rule = validationRules[current.id];
    if (rule && value && !rule.regex.test(value)) {
      return setError(rule.message);
    }

    try {
      const res = await post("/api/trackSolarDevice", payload);
      navigate("/dashboard", { state: res });
    } catch (err) {
      setError("Failed to submit. Please try again later.");
    }
  };

  useEffect(() => {
    if (step >= 0 && step < questions.length) animateIn();
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen flex flex-col bg-black text-white overflow-hidden">
      <div className="h-[18vh] w-full relative mb-3">
        <img
          src={solarImage}
          alt="Banner"
          className="w-full h-full object-cover opacity-80"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow z-30 rounded-full border border-white p-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {step >= 0 && step < questions.length && (
        <div className="px-6 md:px-20 pt-2 pb-2">
          <div className="text-subheading font-bold text-white mb-1">
            Question {step + 1} of {questions.length}
          </div>
          <div className="flex gap-1 justify-start">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < step
                    ? "bg-green"
                    : i === step
                    ? "bg-yellow"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 px-6 md:px-20 pt-6 flex flex-col items-start overflow-y-auto pb-10 relative">
        <h1 className="font-bold text-heading mb-1 bg-green p-3 rounded">
          TheSolarHome
        </h1>
        <p className="text-subheading mb-6 mt-2 text-yellow">
          India's First Solar Calculator
        </p>

        {step === -1 ? (
          <div className="space-y-8 max-w-2xl">
            <p className="text-para text-white">
              Welcome to 'The Solar Home'. Answer a few questions to get a
              complete solar energy report for your rooftop.
            </p>
            <SolarButton
              className="flex content-center items-center gap-1"
              onClick={() => setStep(0)}
            >
              Sounds Good <ArrowRight className="w-6 h-6" />
            </SolarButton>
          </div>
        ) : (
          <>
            <div ref={containerRef} className="w-full max-w-4xl space-y-6">
              {questions[step] && (
                <div ref={questionRef}>
                  <h2 className="text-subheading mb-3">
                    {questions[step].label}
                  </h2>
                  <p className="text-sm text-gray-300 mb-5">
                    {questions[step].description}
                  </p>
                  <input
                    type="text"
                    className={`w-full bg-transparent border-b ${
                      error ? "border-red-300" : "border-yellow/60"
                    } text-white placeholder-gray-400 py-3 focus:outline-none focus:border-yellow transition`}
                    placeholder="Type your answer..."
                    value={payload[questions[step].id] || ""}
                    onChange={handleChange}
                  />
                  {error && (
                    <p className="text-red-300 mt-2 text-sm font-medium">
                      {error}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between mt-5 w-full max-w-4xl">
              <button
                onClick={back}
                disabled={step === 0}
                className="rounded-full p-4 bg-white/10 text-white hover:bg-white hover:text-black transition disabled:opacity-30"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              {step === questions.length - 1 ? (
                <SolarButton onClick={handleSubmit}>
                  <Send className="w-6 h-6" />
                </SolarButton>
              ) : (
                <SolarButton
                  onClick={validateAndNext}
                  className="flex content-center items-center"
                >
                  {questions[step].buttonText}
                  <ArrowRight className="w-6 h-6" />
                </SolarButton>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
