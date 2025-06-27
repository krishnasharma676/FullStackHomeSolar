import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Send, X } from "lucide-react";
import solarImage from "../assets/images/modal-image.png";
import SolarButton from "./SolarButton";

export default function ModalForm({ onClose }) {
  const navigate = useNavigate();

  const validationRules = {
    name: {
      regex: /^[a-zA-Z\s]{3,50}$/,
      message: "Enter a valid name (3-50 alphabetic characters).",
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      message: "Enter a valid email address.",
    },
    bill: {
      regex: /^\d{2,7}$/,
      message: "Enter a valid bill amount (₹10 - ₹10,00,000).",
    },
    currentYear: {
      regex: /^20[2-9]\d$/, // allows 2020 - 2099
      message: "Enter a valid year like 2025.",
    },
    perUnitRate: {
      regex: /^(\d+)(\.\d{1,2})?$/,
      message: "Enter a valid number like 7.5.",
    },
    yoyIncrease: {
      regex: /^([0-9]|[1-9][0-9])$/,
      message: "Enter a number between 0 to 99.",
    },
    roofArea: {
      regex: /^\d{1,6}$/,
      message: "Enter rooftop area in sqft (up to 6 digits).",
    },
    location: {
      regex: /^.{4,100}$/,
      message: "Enter a valid location or pincode.",
    },
    latitude: {
      regex: /^-?\d{1,2}\.\d+$/,
      message: "Enter a valid latitude like 28.6",
    },
    longitude: {
      regex: /^-?\d{1,3}\.\d+$/,
      message: "Enter a valid longitude like 77.2",
    },
    investOption: {
      regex: /^(sip|fd)$/i,
      message: "Enter SIP or FD",
    },
    systemSize: {
      regex: /^\d+(\.\d{1,2})?$/,
      message: "Enter system size in kWp like 3.2",
    },
  };

  // const questions = [
  //   { id: "name", label: "Your Full Name?", description: "So we know whom we are talking to", required: true, buttonText :"Now you know me.. Lets get real" },
  //   { id: "email", label: "What's your email?", description: "We'll send your solar savings report here.", required: true, buttonText :"hello" },
  //   { id: "bill", label: "What's your average monthly electricity bill (in ₹) like?", description: " Typically Summer bills are higher then winters. Provide average of your last 12 month bill. This will help suggest the required system size", required: true, buttonText :"can i reduce it? can't wait to see how :-)" },
  //   { id: "roofArea", label: "Approx. how much shadow free rooftop area (in Sqft) available at your roof?", description: "Just to help analyse the solar feasibility of your roof. Generally measured as length x breadth of available roof minus any unavailable space. Please mention area in sqft ( 1 square meter = 10.764 sqft and 1 square gaj = 8.99 sqft ) for accurate results.", required: false, buttonText: "Here you go" },
  //   { id: "location", label: "What's your Home Address (with Pincode)?", description: " So we can analyse your roof via satellite image, run some calculations in your area and provide accurate results. However if don't want to share your full address please share your pincode to proceed.", required: false, buttonText: "Got it, makesense" },
  //   // { id: "monthlyUnits", label: "How many electricity units (kWh) you use monthly?", description: "Helps estimate solar panel capacity needed.", required: false, buttonText: "biee" },
  // ];

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
      description:
        "Provide average of your last 12 months to help suggest system size.",
      required: true,
      buttonText: "Let's bring it down!",
    },
    {
      id: "currentYear",
      label: "What's the current year?",
      description:
        "Used to calculate your future electricity cost projections.",
      required: true,
      buttonText: "Onwards!",
    },
    {
      id: "perUnitRate",
      label: "What's your current electricity rate (₹/kWh)?",
      description: "Check your latest bill to get this number.",
      required: true,
      buttonText: "Done!",
    },
    {
      id: "yoyIncrease",
      label: "Estimated yearly increase in electricity tariff (%)?",
      description:
        "Most states see 3-6% hike annually. We'll use this to forecast your future bills.",
      required: true,
      buttonText: "Got it",
    },
    {
      id: "roofArea",
      label:
        "Approx. how much shadow-free rooftop area (in sqft) is available?",
      description:
        "Helps us check if your roof has enough space for solar panels.",
      required: false,
      buttonText: "Here it is",
    },
    {
      id: "location",
      label: "What's your Home Address or Pincode?",
      description:
        "Used to analyze satellite image, local subsidy & solar potential. Just pincode is fine too.",
      required: false,
      buttonText: "Added!",
    },
    {
      id: "latitude",
      label: "Latitude of your location (optional)",
      description: "Used for more accurate CO₂ savings & solar potential",
      required: false,
      buttonText: "Added Latitude",
    },
    {
      id: "longitude",
      label: "Longitude of your location (optional)",
      description: "Used with latitude for better location mapping",
      required: false,
      buttonText: "Added Longitude",
    },
    {
      id: "investOption",
      label: "Want to invest your monthly savings? (SIP/FD)",
      description: "We’ll show how your savings can grow over time if invested",
      required: false,
      buttonText: "Let's grow it!",
    },
    {
      id: "systemSize",
      label: "Know your system size already? (in kWp)",
      description:
        "Skip if you want us to calculate based on your bill & location",
      required: false,
      buttonText: "Optional, but added",
    },
  ];

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

  // const validateAndNext = () => {
  //   const currentQuestion = questions[step];
  //   const value = payload[currentQuestion.id]?.trim();

  //   if (currentQuestion.required && !value) {
  //     setError("This field is required.");
  //     return;
  //   }

  //   animateOut("next", () => {
  //     setStep((prev) => prev + 1);
  //   });
  // };

  const validateAndNext = () => {
    const currentQuestion = questions[step];
    const value = payload[currentQuestion.id]?.trim();

    if (currentQuestion.required && !value) {
      setError("This field is required.");
      return;
    }

    const rule = validationRules[currentQuestion.id];
    if (rule && value && !rule.regex.test(value)) {
      setError(rule.message);
      return;
    }

    animateOut("next", () => {
      setStep((prev) => prev + 1);
    });
  };

  const back = () => {
    if (step > 0) {
      setError("");
      animateOut("back", () => setStep((prev) => prev - 1));
    }
  };

  // const handleSubmit = async () => {
  //   const currentQuestion = questions[step];
  //   const value = payload[currentQuestion.id]?.trim();

  //   if (currentQuestion.required && !value) {
  //     setError("This field is required.");
  //     return;
  //   }

  //   try {
  //     const res = await post("/api/trackSolarDevice", payload);
  //     navigate("/dashboard", { state: res });
  //   } catch (err) {
  //     setError("Failed to submit. Please try again later.");
  //   }
  // };

  const handleSubmit = async () => {
    const currentQuestion = questions[step];
    const value = payload[currentQuestion.id]?.trim();

    if (currentQuestion.required && !value) {
      setError("This field is required.");
      return;
    }

    const rule = validationRules[currentQuestion.id];
    if (rule && value && !rule.regex.test(value)) {
      setError(rule.message);
      return;
    }

    try {
      const res = await post("/api/trackSolarDevice", payload);
      navigate("/dashboard", { state: res });
    } catch (err) {
      setError("Failed to submit. Please try again later.");
    }
  };

  useEffect(() => {
    if (step >= 0) animateIn();
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
        <p className="text-subheading mb-6 text-yellow">
          India's First Solar Calculator
        </p>

        {step === -1 ? (
          <div className="space-y-8 max-w-2xl">
            <p className="text-para text-white">
              Welcome to 'The Solar Home, to begin your Solar. Answer a few
              questions for us and you'll get a comprehensive solar energy
              analysis for your rooftop. This should only take couple of
              minutes.
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
                  <Send className="w-6 h-6 flex content-center items-center" />
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
