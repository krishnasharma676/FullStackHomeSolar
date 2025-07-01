// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { post } from "../utils/api";
// import gsap from "gsap";
// import { ArrowLeft, ArrowRight, Send, X } from "lucide-react";
// import solarImage from "../assets/images/modal-image.png";
// import SolarButton from "./SolarButton";

// export default function ModalForm({ onClose }) {
//   const navigate = useNavigate();

//   const questions = [
//     {
//       id: "name",
//       label: "Your Full Name?",
//       description: "So we know whom we are talking to",
//       required: true,
//       buttonText: "Nice to meet you!",
//     },
//     {
//       id: "locationDetails",
//       label: "What is your home address with pincode (where you want your rooftop solar)?",
//       description:
//         "So we can analyse your roof, run some calculations (for tariffs, subsidies, and weather data) in your area and provide accurate results. Sharing Pincode is mandatory to proceed.",
//       required: true,
//       type: "dualInput",
//       fields: [
//         { key: "address", label: "Address", placeholder: "Your home address..." },
//         { key: "pincode", label: "Pincode", placeholder: "6-digit Pincode" },
//       ],
//       buttonText: "Got it, Make Sense -->",
//     },
//     {
//       id: "bill",
//       label: "What's your average monthly electricity bill (₹) or consumption (kWh)?",
//       description: "Choose one and enter the value. Sharing pincode is mandatory to proceed.",
//       type: "radioInput",
//       required: true,
//       options: [
//         { key: "monthlyBill", label: "Monthly Bill (₹)" },
//         { key: "monthlyUnits", label: "Monthly Consumption (kWh)" },
//       ],
//       buttonText: "Let's bring it down!",
//     },
//     {
//       id: "roofArea",
//       label: "Approx. how much shadow free rooftop area (in Sqft) available at your roof?",
//       description:
//         "Just to help analyse the solar feasibility of your roof. Generally measured as 'length x breadth' of available roof minus any unavailable space. Please mention area in sqft (1 square meter = 10.764 sqft and 1 square gaj = 8.99 sqft) for accurate results.",
//       required: true,
//       buttonText: "Check Roof Feasibility",
//     },
//   ];

//   const validationRules = {
//     name: { regex: /^[a-zA-Z\s]{3,50}$/, message: "Enter a valid name." },
//     address: { regex: /^.{4,100}$/, message: "Enter a valid address (min 4 chars)" },
//     pincode: { regex: /^[1-9][0-9]{5}$/, message: "Enter a valid 6-digit Indian pincode" },
//     monthlyBill: { regex: /^\d{2,7}$/, message: "Enter a valid bill amount." },
//     monthlyUnits: { regex: /^\d{2,6}$/, message: "Enter valid units (kWh)." },
//     roofArea: { regex: /^\d{1,6}$/, message: "Enter valid area in sqft (max 6 digits)" },
//   };

//   const [step, setStep] = useState(-1);
//   const [payload, setPayload] = useState({});
//   const [error, setError] = useState("");
//   const [isPincodeVerified, setIsPincodeVerified] = useState(false);
//   const questionRef = useRef(null);

//   const handleChange = (e) => {
//     setPayload({ ...payload, [questions[step].id]: e.target.value });
//     if (error) setError("");
//   };

//   const animateIn = () => {
//     gsap.fromTo(
//       questionRef.current,
//       { opacity: 0, x: 100 },
//       { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
//     );
//   };

//   const animateOut = (direction, callback) => {
//     gsap.to(questionRef.current, {
//       opacity: 0,
//       x: direction === "next" ? -100 : 100,
//       duration: 0.3,
//       ease: "power2.in",
//       onComplete: callback,
//     });
//   };

//   const validateAndNext = () => {
//     const current = questions[step];

//     if (current.id === "locationDetails") {
//       const address = payload.address?.trim();
//       const pincode = payload.pincode?.trim();

//       if (!address || !pincode)
//         return setError("Both address and pincode are required.");
//       if (!validationRules.address.regex.test(address))
//         return setError(validationRules.address.message);
//       if (!validationRules.pincode.regex.test(pincode))
//         return setError(validationRules.pincode.message);
//       if (!isPincodeVerified)
//         return setError("Please verify the pincode before proceeding.");

//       return animateOut("next", () => setStep((prev) => prev + 1));
//     }

//     if (current.id === "bill") {
//       const selected = payload.selectedBillType;
//       const value = payload[selected]?.trim();
//       if (!selected || !value) return setError("Please select and enter the value.");
//       const rule = validationRules[selected];
//       if (!rule.regex.test(value)) return setError(rule.message);
//       return animateOut("next", () => setStep((prev) => prev + 1));
//     }

//     const value = payload[current.id]?.trim();
//     if (!value) return setError("This field is required.");
//     const rule = validationRules[current.id];
//     if (rule && !rule.regex.test(value)) return setError(rule.message);

//     animateOut("next", () => setStep((prev) => prev + 1));
//   };

//   const back = () => {
//     if (step > 0) {
//       setError("");
//       animateOut("back", () => setStep((prev) => prev - 1));
//     }
//   };

//   const handleSubmit = async () => {
//     const current = questions[step];

//     if (current.id === "bill") {
//       const selected = payload.selectedBillType;
//       const value = payload[selected]?.trim();
//       if (!selected || !value) return setError("Please select and enter the value.");
//       const rule = validationRules[selected];
//       if (!rule.regex.test(value)) return setError(rule.message);

//       const finalPayload = {
//         ...payload,
//         bill: value,
//       };
//       delete finalPayload.selectedBillType;
//       delete finalPayload.monthlyBill;
//       delete finalPayload.monthlyUnits;

//       try {
//         const res = await post("/api/trackSolarDevice", finalPayload);
//         navigate("/dashboard", { state: res });
//       } catch (err) {
//         setError("Failed to submit. Please try again later.");
//       }
//       return;
//     }

//     const value = payload[current.id]?.trim();
//     if (!value) return setError("This field is required.");
//     const rule = validationRules[current.id];
//     if (!rule.regex.test(value)) return setError(rule.message);

//     try {
//       const res = await post("/api/trackSolarDevice", payload);
//       navigate("/dashboard", { state: res });
//     } catch (err) {
//       setError("Failed to submit. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     if (step >= 0 && step < questions.length) animateIn();
//   }, [step]);

//   return (
//     <div className="fixed inset-0 z-50 h-screen w-screen flex flex-col bg-black text-white overflow-hidden">
//       <div className="h-[18vh] w-full relative mb-3">
//         <img src={solarImage} alt="Banner" className="w-full h-full object-cover opacity-80" />
//         <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-yellow z-30 rounded-full border border-white p-2">
//           <X className="w-6 h-6" />
//         </button>
//       </div>

//       {step >= 0 && step < questions.length && (
//         <div className="px-6 md:px-20 pt-2 pb-2">
//           <div className="text-subheading font-bold text-white mb-1">
//             Question {step + 1} of {questions.length}
//           </div>
//           <div className="flex gap-1 justify-start">
//             {questions.map((_, i) => (
//               <div
//                 key={i}
//                 className={`h-2 flex-1 rounded-full ${
//                   i < step ? "bg-green" : i === step ? "bg-yellow" : "bg-white/30"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="flex-1 px-6 md:px-20 pt-6 flex flex-col items-start overflow-y-auto pb-10 relative">
//         <h1 className="font-bold text-heading mb-1 bg-green p-3 rounded">TheSolarHome</h1>
//         <p className="text-subheading mb-6 mt-2 text-yellow">India's First Solar Calculator</p>

//         {step === -1 ? (
//           <div className="space-y-8 max-w-2xl">
//             <p className="text-para text-white">
//               Welcome to 'The Solar Home', your one stop platform to begin your Solar Journey.
//             </p>
//             <SolarButton className="flex content-center items-center gap-1" onClick={() => setStep(0)}>
//               Sounds Good <ArrowRight className="w-6 h-6" />
//             </SolarButton>
//           </div>
//         ) : (
//           <>
//             <div ref={questionRef} className="w-full max-w-4xl space-y-6">
//               <h2 className="text-subheading mb-3">{questions[step].label}</h2>
//               <p className="text-sm text-gray-300 mb-5">{questions[step].description}</p>

//               {questions[step].type === "dualInput" ? (
//                 <>
//                   <div className="flex flex-col md:flex-row gap-5 mb-5">
//                     {questions[step].fields.map((field) => (
//                       <div key={field.key} className="w-full">
//                         <label className="block text-white mb-1">{field.label}</label>
//                         <input
//                           type="text"
//                           placeholder={field.placeholder}
//                           value={payload[field.key] || ""}
//                           onChange={(e) => {
//                             setPayload((prev) => ({ ...prev, [field.key]: e.target.value }));
//                             if (field.key === "pincode") setIsPincodeVerified(false);
//                             setError("");
//                           }}
//                           onBlur={
//                             field.key === "pincode"
//                               ? async () => {
//                                   const pin = payload.pincode?.trim();
//                                   if (!pin || !validationRules.pincode.regex.test(pin)) return;
//                                   setError("Validating Pincode...");
//                                   // Uncomment when backend is ready
//                                   /*
//                                   try {
//                                     const res = await post("/api/verifyPincode", { pincode: pin });
//                                     if (res?.valid) {
//                                       setIsPincodeVerified(true);
//                                       setError("");
//                                     } else {
//                                       setError("Pincode not serviceable.");
//                                       setIsPincodeVerified(false);
//                                     }
//                                   } catch {
//                                     setError("Server error during pincode verification.");
//                                     setIsPincodeVerified(false);
//                                   }
//                                   */
//                                   // Dummy simulation
//                                   setTimeout(() => {
//                                     setIsPincodeVerified(true);
//                                     setError("");
//                                   }, 500);
//                                 }
//                               : undefined
//                           }
//                           className={`w-full bg-transparent border-b ${
//                             error && !payload[field.key] ? "border-red-300" : "border-yellow/60"
//                           } text-white placeholder-gray-400 py-3 focus:outline-none focus:border-yellow transition`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                   {error && <p className="text-red-300 mt-2 text-sm font-medium">{error}</p>}
//                 </>
//               ) : questions[step].type === "radioInput" ? (
//                 <>
//                   <div className="flex flex-col md:flex-row gap-4">
//                     {questions[step].options.map((option) => (
//                       <label
//                         key={option.key}
//                         className={`flex-1 border border-yellow/50 rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer hover:border-yellow transition ${
//                           payload.selectedBillType === option.key ? "border-yellow bg-white/10" : ""
//                         }`}
//                         onClick={() => {
//                           setPayload((prev) => ({
//                             ...prev,
//                             selectedBillType: option.key,
//                             [option.key]: "",
//                           }));
//                           setError("");
//                         }}
//                       >
//                         <input
//                           type="radio"
//                           name="billOption"
//                           value={option.key}
//                           checked={payload.selectedBillType === option.key}
//                           onChange={() => {}}
//                           className="accent-yellow w-4 h-4"
//                         />
//                         <span className="text-white">{option.label}</span>
//                       </label>
//                     ))}
//                   </div>

//                   {payload.selectedBillType && (
//                     <input
//                       type="text"
//                       placeholder={`Enter ${
//                         payload.selectedBillType === "monthlyBill" ? "₹ amount" : "units in kWh"
//                       }`}
//                       value={payload[payload.selectedBillType] || ""}
//                       onChange={(e) =>
//                         setPayload((prev) => ({
//                           ...prev,
//                           [payload.selectedBillType]: e.target.value,
//                         }))
//                       }
//                       className={`w-full mt-5 bg-transparent border-b ${
//                         error ? "border-red-300" : "border-yellow/60"
//                       } text-white placeholder-gray-400 py-3 focus:outline-none focus:border-yellow transition`}
//                     />
//                   )}

//                   {error && <p className="text-red-300 mt-2 text-sm font-medium">{error}</p>}
//                 </>
//               ) : (
//                 <>
//                   <input
//                     type="text"
//                     className={`w-full bg-transparent border-b ${
//                       error ? "border-red-300" : "border-yellow/60"
//                     } text-white placeholder-gray-400 py-3 focus:outline-none focus:border-yellow transition`}
//                     placeholder="Type your answer..."
//                     value={payload[questions[step].id] || ""}
//                     onChange={handleChange}
//                   />
//                   {error && <p className="text-red-300 mt-2 text-sm font-medium">{error}</p>}
//                 </>
//               )}
//             </div>

//             <div className="flex justify-between mt-5 w-full max-w-4xl">
//               <button
//                 onClick={back}
//                 disabled={step === 0}
//                 className="rounded-full p-4 bg-white/10 text-white hover:bg-white hover:text-black transition disabled:opacity-30"
//               >
//                 <ArrowLeft className="w-6 h-6" />
//               </button>

//               {step === questions.length - 1 ? (
//                 <SolarButton onClick={handleSubmit}>
//                   <Send className="w-6 h-6" />
//                 </SolarButton>
//               ) : (
//                 <SolarButton onClick={validateAndNext} className="flex content-center items-center">
//                   {questions[step].buttonText}
//                   <ArrowRight className="w-6 h-6" />
//                 </SolarButton>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Send, X } from "lucide-react";
import solarImage from "../assets/images/modal-image.png";
import SolarButton from "./SolarButton";

export default function ModalForm({ onClose }) {
  const navigate = useNavigate();
  const questionRef = useRef(null);
  const [step, setStep] = useState(-1);
  const [payload, setPayload] = useState({});
  const [error, setError] = useState("");
  const [isPincodeVerified, setIsPincodeVerified] = useState(false);

  const questions = [
    {
      id: "name",
      label: "Your Full Name?",
      description: "So we know whom we are talking to",
      required: true,
      buttonText: "Nice to meet you!",
    },
    {
      id: "locationDetails",
      label: "What is your home address with pincode?",
      description: "To run accurate solar analysis for your area.",
      required: true,
      type: "dualInput",
      fields: [
        { key: "address", label: "Address", placeholder: "Enter your address" },
        { key: "pincode", label: "Pincode", placeholder: "6-digit PIN" },
      ],
      buttonText: "Proceed",
    },
    {
      id: "bill",
      label: "What's your average monthly electricity bill or consumption?",
      description: "Choose one and enter its value",
      type: "radioInput",
      required: true,
      options: [
        { key: "monthlyBill", label: "Monthly Bill (₹)" },
        { key: "monthlyUnits", label: "Monthly Consumption (kWh)" },
      ],
      buttonText: "Let's bring it down!",
    },
    {
      id: "roofArea",
      label: "Approx. how much shadow free rooftop area (in Sqft)?",
      description:
        "Helps us check roof feasibility. 1 sq.m = 10.76 sqft | 1 gaj = 8.99 sqft.",
      required: true,
      buttonText: "Check Roof Feasibility",
    },
    {
      id: "moreInfo",
      label: "We're so grateful for your time with us so far.",
      description:
        "We feel like we already know you. Want to speed up processing?",
      type: "radioInfo",
      required: true,
      options: [
        {
          key: "option1",
          label: "Sure, Please proceed I want to move faster on this",
        },
        {
          key: "option2",
          label: "Nah, I am done for now and want to see my results",
        },
      ],
      buttonText: "Continue",
    },
    {
      id: "followUp",
      label:
        "Please email your recent electricity bill to hello@thesolarhome.in or Whatsapp to +91 88x xxx xxxx.",
      description:
        "This helps us to provide the most accurate results and assess solar support.",
      type: "radioFollowup",
      required: true,
      options: [
        { key: "shared", label: "Shared the electricity bill, please check" },
        {
          key: "notHandy",
          label:
            "Not handy now, will share shortly. Please follow up in some time",
        },
        {
          key: "notWilling",
          label:
            "I don't wish to share at this point. Just show me the results.",
        },
      ],
      buttonText: "Next",
    },
    {
      id: "userPhone",
      label: "Please enter your Phone Number",
      description: "We may also reach out on WhatsApp.",
      required: true,
      buttonText: "Next",
    },
    {
      id: "userEmail",
      label: "Please enter your Email ID",
      description: "So we can follow up with you easily.",
      required: true,
      buttonText: "Submit",
    },
  ];

  const validationRules = {
    name: { regex: /^[a-zA-Z\s]{3,50}$/, message: "Enter a valid name." },
    address: { regex: /^.{4,100}$/, message: "Address too short." },
    pincode: { regex: /^[1-9][0-9]{5}$/, message: "Enter a 6-digit PIN" },
    monthlyBill: { regex: /^\d{2,7}$/, message: "Enter valid bill (₹)" },
    monthlyUnits: { regex: /^\d{2,6}$/, message: "Enter valid units (kWh)" },
    roofArea: { regex: /^\d{1,6}$/, message: "Enter rooftop area in sqft" },
    userEmail: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      message: "Invalid email address",
    },
    userPhone: {
      regex: /^[6-9]\d{9}$/,
      message: "Invalid phone number",
    },
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
  const handleRadioFollowup = (key) => {
    setPayload((prev) => ({ ...prev, followUp: key }));
    setError("");

    if (key === "shared") {
      setTimeout(() => {
        alert("Thank you so much for your promptness!");
        navigate("/dashboard");
      }, 1000);
    } else if (key === "notHandy") {
      animateOut("next", () => setStep((prev) => prev + 1)); // phone step
    } else if (key === "notWilling") {
      setTimeout(() => {
        handleSubmit(); // submit directly
      }, 1000);
    }
  };

  const validateInput = (id, value) => {
    const rule = validationRules[id];
    if (!value || !value.trim()) return "This field is required.";
    if (rule && !rule.regex.test(value.trim())) return rule.message;
    return "";
  };

  const validateAndNext = () => {
    const current = questions[step];

    if (current.id === "locationDetails") {
      const address = payload.address?.trim();
      const pincode = payload.pincode?.trim();

      const err1 = validateInput("address", address);
      if (err1) return setError(err1);

      const err2 = validateInput("pincode", pincode);
      if (err2) return setError(err2);

      if (!isPincodeVerified) return setError("Please verify your pincode.");

      return animateOut("next", () => setStep((prev) => prev + 1));
    }

    if (current.id === "bill") {
      const selected = payload.selectedBillType;
      const value = payload[selected]?.trim();

      if (!selected) return setError("Please select an option.");
      const err = validateInput(selected, value);
      if (err) return setError(err);

      return animateOut("next", () => setStep((prev) => prev + 1));
    }

    if (current.id === "moreInfo") {
      if (!payload.moreInfo) return setError("Please select an option.");
      if (payload.moreInfo === "option1") {
        return animateOut("next", () => setStep((prev) => prev + 1));
      } else {
        setTimeout(() => handleSubmit(), 1000);
        return;
      }
    }

    if (current.id === "followUp") {
      if (!payload.followUp) return setError("Please select an option.");
      // actual flow is handled via `handleRadioFollowup`, so just stop here
      return;
    }

    const value = payload[current.id]?.trim();
    const err = validateInput(current.id, value);
    if (err) return setError(err);

    animateOut("next", () => setStep((prev) => prev + 1));
  };

  const back = () => {
    if (step > 0) {
      setError("");
      animateOut("back", () => setStep((prev) => prev - 1));
    }
  };

  const handleSubmit = async () => {
    const finalPayload = {
      ...payload,
      bill: payload.selectedBillType
        ? payload[payload.selectedBillType]
        : payload.bill,
    };
    delete finalPayload.selectedBillType;
    delete finalPayload.monthlyBill;
    delete finalPayload.monthlyUnits;

    try {
      const res = await post("/api/trackSolarDevice", finalPayload);
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
      {/* Banner Image with Close Button */}
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

      {/* Progress bar */}
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

      {/* Content Wrapper */}
      <div className="flex-1 px-6 md:px-20 pt-6 flex flex-col items-start overflow-y-auto pb-10 relative">
        <h1 className="font-bold text-subheading mb-1 bg-green p-3 rounded">
          TheSolarHome
        </h1>
        <p className="text-para mb-6 mt-2 text-yellow">
          India's First Solar Calculator
        </p>

        {/* Welcome Screen */}
        {step === -1 ? (
          <div className="space-y-8 max-w-2xl">
            <p className="text-para text-white">
              Welcome to 'The Solar Home', your one stop platform to begin your
              Solar Journey.
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
            <div ref={questionRef} className="w-full space-y-6">
              {questions[step] && (
                <>
                  <h2 className="text-subheading mb-3">
                    {questions[step].label}
                  </h2>
                  <p className="text-sm text-gray-300 mb-5">
                    {questions[step].description}
                  </p>

                  {/* Dual Input (Address & Pincode) */}
                  {questions[step].type === "dualInput" && (
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                      {questions[step].fields.map((field) => (
                        <input
                          key={field.key}
                          type="text"
                          placeholder={field.placeholder}
                          value={payload[field.key] || ""}
                          onChange={(e) => {
                            setPayload((prev) => ({
                              ...prev,
                              [field.key]: e.target.value,
                            }));
                            setError("");
                          }}
                          onBlur={() => {
                            if (field.key === "pincode") {
                              // Future Pincode Verification
                              // const res = await post("/api/verifyPincode", { pincode: payload.pincode });
                              setIsPincodeVerified(true);
                            }
                          }}
                          className="w-full bg-transparent border-b border-yellow text-white py-3 placeholder-gray-400 focus:outline-none"
                        />
                      ))}
                    </div>
                  )}

                  {/* Bill Options Radio + Input */}
                  {questions[step].type === "radioInput" && (
                    <>
                      <div className="flex flex-col gap-4">
                        {questions[step].options.map((option) => (
                          <label
                            key={option.key}
                            className={`flex items-center gap-3 cursor-pointer border p-3 rounded-lg ${
                              payload.selectedBillType === option.key
                                ? "border-yellow bg-white/10"
                                : "border-white/30"
                            }`}
                            onClick={() => {
                              setPayload((prev) => ({
                                ...prev,
                                selectedBillType: option.key,
                              }));
                              setError("");
                            }}
                          >
                            <input
                              type="radio"
                              checked={
                                payload.selectedBillType === option.key
                              }
                              onChange={() => {}}
                              className="accent-yellow"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                      {payload.selectedBillType && (
                        <input
                          type="text"
                          placeholder="Enter value"
                          className="w-full bg-transparent border-b border-yellow text-white py-3 placeholder-gray-400 mt-4"
                          value={payload[payload.selectedBillType] || ""}
                          onChange={(e) => {
                            setPayload((prev) => ({
                              ...prev,
                              [payload.selectedBillType]: e.target.value,
                            }));
                            setError("");
                          }}
                        />
                      )}
                    </>
                  )}
                  {/* Radio Question (More Info) */}
                  {questions[step].type === "radioInfo" && (
                    <div className="flex flex-col gap-4">
                      {questions[step].options.map((opt) => (
                        <label
                          key={opt.key}
                          className={`border p-3 rounded-lg cursor-pointer hover:border-yellow ${
                            payload.moreInfo === opt.key
                              ? "border-yellow bg-white/10"
                              : "border-white/30"
                          }`}
                          onClick={() => {
                            setPayload((prev) => ({
                              ...prev,
                              moreInfo: opt.key,
                            }));
                            setError("");
                          }}
                        >
                          <input
                            type="radio"
                            name="moreInfo"
                            className="mr-2 accent-yellow"
                            checked={payload.moreInfo === opt.key}
                            onChange={() => {}}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Follow Up Options (3 options) */}
                  {questions[step].type === "radioFollowup" && (
                    <div className="flex flex-col gap-4">
                      {questions[step].options.map((opt) => (
                        <label
                          key={opt.key}
                          className={`border p-3 rounded-lg cursor-pointer hover:border-yellow ${
                            payload.followUp === opt.key
                              ? "border-yellow bg-white/10"
                              : "border-white/30"
                          }`}
                          onClick={() => handleRadioFollowup(opt.key)}
                        >
                          <input
                            type="radio"
                            name="followUp"
                            className="mr-2 accent-yellow"
                            checked={payload.followUp === opt.key}
                            onChange={() => {}}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Default Input Field */}
                  {!questions[step].type && (
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-yellow text-white placeholder-gray-400 py-3 focus:outline-none"
                      placeholder="Type your answer..."
                      value={payload[questions[step].id] || ""}
                      onChange={(e) => {
                        setPayload((prev) => ({
                          ...prev,
                          [questions[step].id]: e.target.value,
                        }));
                        setError("");
                      }}
                    />
                  )}

                  {/* Error Message */}
                  {error && (
                    <p className="text-red-300 mt-2 text-sm font-medium">
                      {error}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-5 w-full">
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
                <SolarButton onClick={validateAndNext}>
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
