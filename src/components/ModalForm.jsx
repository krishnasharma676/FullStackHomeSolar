import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";
import gsap from "gsap";
import solarBg from "../assets/images/image-3.jpg";
import { SunMoon, ArrowLeft, ArrowRight, Send, X } from "lucide-react";

export default function ModalForm({ onClose }) {
  const navigate = useNavigate();
  const questions = [
  {
    id: "name",
    label: "What's your name?",
    description: "This helps us personalize your solar journey.",
    required: true,
  },
  {
    id: "email",
    label: "What's your email?",
    description: "We'll send your solar savings report here.",
    required: true,
  },
  {
    id: "bill",
    label: "Your average monthly electricity bill (₹)?",
    description: "Used to estimate your solar savings and system size.",
    required: true,
  },
  {
    id: "monthlyUnits",
    label: "How many electricity units (kWh) you use monthly?",
    description: "Helps estimate solar panel capacity needed.",
    required: false,
  },
  {
    id: "roofArea",
    label: "Approximate rooftop area (in sq. ft)?",
    description: "To calculate how many panels can fit.",
    required: false,
  },
  {
    id: "location",
    label: "Which city or area do you live in?",
    description: "Location helps us estimate solar potential.",
    required: false,
  }
];


  const [step, setStep] = useState(0);
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
    const currentQuestion = questions[step];
    const value = payload[currentQuestion.id]?.trim();

    if (currentQuestion.required && !value) {
      setError("This field is required.");
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

  const handleSubmit = async () => {
    const currentQuestion = questions[step];
    const value = payload[currentQuestion.id]?.trim();

    if (currentQuestion.required && !value) {
      setError("This field is required.");
      return;
    }

    try {
      const res = await post("/api/trackSolarDevice", payload); // adjust endpoint as needed
      console.log("API Response:", res);
      navigate("/dashboard", { state: res });// pass response data to dashboard
    } catch (err) {
      console.error("Submission Error:", err.message);
      setError("Failed to submit. Please try again later.");
    }
  };

  useEffect(() => {
    animateIn();
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/80 px-4">
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-yellow shadow-[0_0_60px_#20b02480] bg-gradient-to-br from-[#111111]/90 to-[#1a1a1a]/80"
        style={{
          backgroundImage: `url(${solarBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-0" />

        {/* Top Header */}
        <div className="relative z-10 flex justify-between items-center px-6 py-4 bg-gradient-to-r from-yellow/90 to-green/70 shadow-inner">
          <div className="flex items-center gap-2">
            <SunMoon className="text-black w-6 h-6" />
            <h2 className="text-lg md:text-2xl font-bold text-black drop-shadow">
              Solar Assessment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:scale-110 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          <div ref={containerRef} className="min-h-[260px] md:min-h-[300px]">
            <div
              ref={questionRef}
              key={step}
              className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-yellow">
                Q{step + 1}) {questions[step].label}
              </h2>
              <p className="text-sm text-gray-300 mb-6">
                {questions[step].description}
              </p>

              <input
                type="text"
                className={`w-full bg-black/40 border ${
                  error ? "border-red-300" : "border-gray-600"
                } text-white placeholder-gray-400 p-3 rounded-lg shadow-sm focus:outline-none focus:border-yellow focus:ring-2 focus:ring-yellow/50 transition`}
                placeholder="Type your answer..."
                value={payload[questions[step].id] || ""}
                onChange={handleChange}
              />

              <p
                className={`text-red-300 mt-2 text-sm font-medium transition-all duration-300 ${
                  error ? "opacity-100" : "opacity-0"
                }`}
              >
                {error}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={back}
              disabled={step === 0}
              className="flex items-center gap-2 bg-black/30 text-white px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {step === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-green text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow transition"
              >
                Submit
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={validateAndNext}
                className="flex items-center gap-2 bg-yellow text-black font-semibold px-6 py-2 rounded-full hover:bg-white transition"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
