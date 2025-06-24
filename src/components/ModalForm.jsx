import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Send, X } from "lucide-react";
import solarImage from "../assets/images/night.png";

export default function ModalForm({ onClose }) {
  const navigate = useNavigate();
  const questions = [
    { id: "name", label: "What's your name?", description: "This helps us personalize your solar journey.", required: true },
    { id: "email", label: "What's your email?", description: "We'll send your solar savings report here.", required: true },
    { id: "bill", label: "Your average monthly electricity bill (₹)?", description: "Used to estimate your solar savings and system size.", required: true },
    { id: "monthlyUnits", label: "How many electricity units (kWh) you use monthly?", description: "Helps estimate solar panel capacity needed.", required: false },
    { id: "roofArea", label: "Approximate rooftop area (in sq. ft)?", description: "To calculate how many panels can fit.", required: false },
    { id: "location", label: "Which city or area do you live in?", description: "Location helps us estimate solar potential.", required: false },
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
      <div className="h-[22vh] w-full relative">
        <img
          src={solarImage}
          alt="Banner"
          className="w-full h-full object-cover opacity-60"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow z-30 rounded-full border border-white p-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {step >= 0 && (
        <div className="px-6 md:px-20 pt-4 pb-2">
          <div className="text-sm font-medium text-white mb-1">
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
        <h1 className="text-yellow font-bold text-2xl md:text-5xl mb-4">TheSolarHome</h1>

        {step === -1 ? (
          <div className="space-y-8 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Sounds good?</h2>
            <p className="text-lg md:text-2xl text-white/90">
              Answer a few quick questions to get your free solar savings report.
            </p>
            <button
              onClick={() => setStep(0)}
              className="bg-yellow text-black font-semibold px-10 py-4 text-lg md:text-xl rounded-full hover:bg-white transition"
            >
              Let's Start
            </button>
          </div>
        ) : (
          <>
            <div ref={containerRef} className="w-full max-w-2xl space-y-6">
              <div ref={questionRef}>
                <h2 className="text-2xl md:text-3xl font-semibold text-yellow mb-2">
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
                  <p className="text-red-300 mt-2 text-sm font-medium">{error}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-10 w-full max-w-2xl">
              <button
                onClick={back}
                disabled={step === 0}
                className="rounded-full p-4 bg-white/10 text-white hover:bg-white hover:text-black transition disabled:opacity-30"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              {step === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="rounded-full p-4 bg-green text-black hover:bg-yellow transition"
                >
                  <Send className="w-6 h-6" />
                </button>
              ) : (
                <button
                  onClick={validateAndNext}
                  className="rounded-full p-4 bg-yellow text-black hover:bg-white transition"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
