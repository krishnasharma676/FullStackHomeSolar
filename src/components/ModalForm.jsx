
// import { useEffect, useRef, useState, useCallback } from "react"
// import { useNavigate } from "react-router-dom"
// import { post } from "../utils/api"
// import gsap from "gsap"
// import { ArrowLeft, ArrowRight, Send, X } from "lucide-react"
// import solarImage from "../assets/images/modal-image.png"
// import SolarButton from "./SolarButton"

// export default function ModalForm({ onClose }) {
//   const navigate = useNavigate()
//   const questionRef = useRef(null)

//   const [step, setStep] = useState(-1)
//   const [payload, setPayload] = useState({})
//   const [error, setError] = useState("")
//   const [isPincodeVerified, setIsPincodeVerified] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const questions = [
//     {
//       id: "name",
//       label: "What is your full name?",
//       description: "So, we can start the healthy conversation with you",
//       required: true,
//       buttonText: "Here you go",
//     },
//     {
//       id: "locationDetails",
//       label: "What is your home address with pincode (where you want your rooftop solar)?",
//       description: "So we can analyse your roof , run some calculations (for tarrifs, subsidies, and weather data ) in your area and provide accurate results. Sharing Pincode is mandatory to proceed. ",
//       required: true,
//       type: "dualInput",
//       fields: [
//         { key: "address", label: "Address", placeholder: "Enter your address" },
//         { key: "pincode", label: "Pincode", placeholder: "6-digit PIN", numeric: true },
//       ],
//       buttonText: "Got it, Make Sense",
//     },
//     {
//       id: "bill",
//       label: "What's your average monthly electricity bill (in ₹) or Average Monthly Electricity Consumption (Units per Month in kWh)? ",
//       description: "Typically summer bills are higher then winters. Provide average of your last 12 month bill. This will help suggest the required system size.",
//       type: "radioInput",
//       required: true,
//       options: [
//         { key: "monthlyBill", label: "Monthly Bill (₹)", numeric: true },
//         { key: "monthlyUnits", label: "Monthly Consumption (kWh)", numeric: true },
//       ],
//       buttonText: "Curious to see how solar can help me save",
//     },
//     {
//       id: "roofArea",
//       label: "Approx. how much shadow free rooftop area (in Sqft) available at your roof? ",
//       description: "Just to help analyse the solar feasibility of your roof. Generally measured as 'length x breadth' of available roof minus any unavailable space. Please mention area in sqft ( 1 square meter = 10.764 sqft and 1 square gaj = 8.99 sqft ) for accurate results.",
//       required: true,
//       buttonText: "Here you go",
//       numeric: true,
//     },
//     {
//       id: "moreInfo",
//       label: "we're so grateful for your time with us so far. ",
//       description: "We feel like we already know you, but if you have some time and can give us a little more information, we can process your request faster!",
//       type: "radioInfo",
//       required: true,
//       options: [
//         {
//           key: "option1",
//           label: "Sure, Please proceed I want to move faster on this",
//         },
//         {
//           key: "option2",
//           label: "Nah, I am done for now and want to see my results",
//         },
//       ],
//       buttonText: "Next",
//     },
//     {
//       id: "followUp",
//       label: "Please email your recent electricity bill to hello@thesolarhome.in or Whatsapp to +91 88x xxx xxxx.",
//       description: "This help us to provide the most accurate results for your home and assess your discom solar support. ",
//       type: "radioFollowup",
//       required: true,
//       options: [
//         { key: "shared", label: "Shared the electricity bill, please check" },
//         {
//           key: "notHandy",
//           label: "Not handy now, will share shortly. Please follow up in some time",
//         },
//         {
//           key: "notWilling",
//           label: "I don't wish to share at this point. May be later, now please show me the assessment results",
//         },
//       ],
//       buttonText: "Done",
//     },
//     {
//       id: "userPhone",
//       label: "What's good phone number to text you later?",
//       description: "We may also reach out.",
//       required: true,
//       buttonText: "Next",
//       numeric: true,
//     },
//     {
//       id: "userEmail",
//       label: "And what's your best email address? ",
//       description: "So we can follow up with you easily.",
//       required: true,
//       buttonText: "Submit",
//     },
//   ]

//   const validationRules = {
//     name: { regex: /^[a-zA-Z\s]{2,50}$/, message: "Enter a valid name (2-50 characters)." },
//     address: { regex: /^.{10,200}$/, message: "Address must be 10-200 characters." },
//     pincode: { regex: /^[1-9][0-9]{5}$/, message: "Enter a valid 6-digit PIN" },
//     monthlyBill: { regex: /^\d{2,7}$/, message: "Enter valid bill amount (₹)" },
//     monthlyUnits: { regex: /^\d{1,6}$/, message: "Enter valid units (kWh)" },
//     roofArea: { regex: /^\d{1,6}$/, message: "Enter rooftop area in sqft" },
//     userEmail: {
//       regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
//       message: "Enter a valid email address",
//     },
//     userPhone: {
//       regex: /^[6-9]\d{9}$/,
//       message: "Enter a valid 10-digit phone number",
//     },
//   }

//   const animateIn = useCallback(() => {
//     if (questionRef.current) {
//       gsap.fromTo(questionRef.current, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" })
//     }
//   }, [])

//   const animateOut = useCallback((direction, callback) => {
//     if (questionRef.current) {
//       gsap.to(questionRef.current, {
//         opacity: 0,
//         x: direction === "next" ? -100 : 100,
//         duration: 0.3,
//         ease: "power2.in",
//         onComplete: callback,
//       })
//     } else {
//       callback()
//     }
//   }, [])

//   const validateInput = useCallback((id, value) => {
//     const rule = validationRules[id]
//     if (!value || !value.toString().trim()) return "This field is required."
//     if (rule && !rule.regex.test(value.toString().trim())) return rule.message
//     return ""
//   }, [])

//   // Helper function to get option label by key
//   const getOptionLabel = useCallback((questionId, optionKey) => {
//     const question = questions.find((q) => q.id === questionId)
//     if (!question || !question.options) return optionKey
//     const option = question.options.find((opt) => opt.key === optionKey)
//     return option ? option.label : optionKey
//   }, [])

//   const handleRadioFollowup = useCallback(
//     (key) => {
//       const optionLabel = getOptionLabel("followUp", key)
//       setPayload((prev) => ({ ...prev, followUp: optionLabel, followUpKey: key }))
//       setError("")
//     },
//     [getOptionLabel],
//   )

//   // Handle numeric input restriction
//   const handleNumericInput = useCallback((e, fieldKey) => {
//     const value = e.target.value
//     // Allow only numbers
//     if (!/^\d*$/.test(value)) {
//       e.preventDefault()
//       return
//     }
//     updatePayload(fieldKey, value)
//   }, [])

//   const validateAndNext = useCallback(() => {
//     if (isSubmitting) return

//     const current = questions[step]
//     if (!current) return

//     setError("")

//     // Handle locationDetails validation
//     if (current.id === "locationDetails") {
//       const address = payload.address?.trim()
//       const pincode = payload.pincode?.trim()

//       const addressError = validateInput("address", address)
//       if (addressError) return setError(addressError)

//       const pincodeError = validateInput("pincode", pincode)
//       if (pincodeError) return setError(pincodeError)

//       if (!isPincodeVerified) return setError("Please verify your pincode.")

//       return animateOut("next", () => setStep((prev) => prev + 1))
//     }

//     // Handle bill validation
//     if (current.id === "bill") {
//       const selected = payload.selectedBillType
//       if (!selected) return setError("Please select an option.")

//       const value = payload[selected]?.trim()
//       const billError = validateInput(selected, value)
//       if (billError) return setError(billError)

//       return animateOut("next", () => setStep((prev) => prev + 1))
//     }

//     // Handle moreInfo validation
//     if (current.id === "moreInfo") {
//       if (!payload.moreInfo) return setError("Please select an option.")

//       if (payload.moreInfoKey === "option1") {
//         return animateOut("next", () => setStep((prev) => prev + 1))
//       } else {
//         // For option2, proceed to submit after delay
//         setTimeout(() => handleSubmit(), 1000)
//         return
//       }
//     }

//     // Handle followUp validation - FIXED: Always show next button
//     if (current.id === "followUp") {
//       if (!payload.followUp) return setError("Please select an option.")

//       // Handle different followUp options when Next is clicked
//       if (payload.followUpKey === "shared") {
//         alert("Thank you so much for your promptness!")
//         return handleSubmit()
//       } else if (payload.followUpKey === "notHandy") {
//         setPayload((prev) => ({ ...prev, awaitingContactDetails: true }))
//         return animateOut("next", () => setStep(6)) // userPhone step
//       } else if (payload.followUpKey === "notWilling") {
//         return handleSubmit()
//       }

//       return animateOut("next", () => setStep((prev) => prev + 1))
//     }

//     // Handle userPhone validation
//     if (current.id === "userPhone") {
//       const phoneError = validateInput("userPhone", payload.userPhone)
//       if (phoneError) return setError(phoneError)

//       if (payload.awaitingContactDetails) {
//         return animateOut("next", () => setStep((prev) => prev + 1)) // to email
//       } else {
//         return handleSubmit()
//       }
//     }

//     // Handle userEmail validation
//     if (current.id === "userEmail") {
//       const emailError = validateInput("userEmail", payload.userEmail)
//       if (emailError) return setError(emailError)
//       return handleSubmit()
//     }

//     // Handle default validation
//     const value = payload[current.id]?.trim()
//     const inputError = validateInput(current.id, value)
//     if (inputError) return setError(inputError)

//     animateOut("next", () => setStep((prev) => prev + 1))
//   }, [step, payload, isPincodeVerified, isSubmitting, validateInput, animateOut])

//   const back = useCallback(() => {
//     if (step > 0 && !isSubmitting) {
//       setError("")
//       animateOut("back", () => setStep((prev) => prev - 1))
//     }
//   }, [step, isSubmitting, animateOut])

//   const handleSubmit = useCallback(async () => {
//     if (isSubmitting) return

//     setIsSubmitting(true)
//     setError("")

//     try {
//       const finalPayload = {
//         ...payload,
//         bill: payload.selectedBillType ? payload[payload.selectedBillType] : payload.bill,
//       }

//       // Clean up temporary fields
//       delete finalPayload.selectedBillType
//       delete finalPayload.monthlyBill
//       delete finalPayload.monthlyUnits
//       delete finalPayload.awaitingContactDetails
//       delete finalPayload.followUpKey
//       delete finalPayload.moreInfoKey

//       const res = await post("/api/trackSolarDevice", finalPayload)
//       navigate("/dashboard", { state: res })
//     } catch (err) {
//       console.error("Submission error:", err)
//       setError("Failed to submit. Please try again later.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }, [payload, isSubmitting, navigate])

//   const handlePincodeVerification = useCallback(async (pincode) => {
//     if (!pincode || !validationRules.pincode.regex.test(pincode)) return

//     setError("Validating Pincode...")

//     try {
//       // Simulate API call - replace with actual API call when ready
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       setIsPincodeVerified(true)
//       setError("")
//     } catch (err) {
//       setError("Pincode verification failed. Please try again.")
//       setIsPincodeVerified(false)
//     }
//   }, [])

//   const updatePayload = useCallback((key, value) => {
//     setPayload((prev) => ({ ...prev, [key]: value }))
//     setError("")
//   }, [])

//   useEffect(() => {
//     if (step >= 0 && step < questions.length) {
//       animateIn()
//     }
//   }, [step, animateIn])

//   // Cleanup GSAP on unmount
//   useEffect(() => {
//     return () => {
//       if (questionRef.current) {
//         gsap.killTweensOf(questionRef.current)
//       }
//     }
//   }, [])

//   const currentQuestion = step >= 0 && step < questions.length ? questions[step] : null
//   const isLastStep = step === questions.length - 1

//   return (
//     <div className="fixed inset-0 z-50 h-screen w-screen flex flex-col bg-black text-white overflow-hidden">
//       {/* Banner Image with Close Button */}
//       <div className="h-[50px] w-full relative mb-3">
//         <img
//           src={solarImage || "/placeholder.svg"}
//           alt="Solar Banner"
//           className="w-full h-full object-cover opacity-80"
//         />
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-white hover:text-yellow z-30 rounded-full border border-white p-2 transition-colors"
//           aria-label="Close modal"
//         >
//           <X className="w-6 h-6" />
//         </button>
//       </div>

//       {/* Progress Bar */}
//       {step >= 0 && step < questions.length && (
//         <div className="w-full px-4 md:px-8 pt-2 pb-2">
//           <div className="text-lg font-bold text-white mb-1">
//             Question {step + 1} of {questions.length}
//           </div>
//           <div className="flex gap-1 justify-start">
//             {questions.map((_, i) => (
//               <div
//                 key={i}
//                 className={`h-2 flex-1 rounded-full transition-colors ${
//                   i < step ? "bg-green" : i === step ? "bg-yellow" : "bg-white/30"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Content Section */}
//       <div className="flex-1 px-4 md:px-8 pt-2 flex flex-col items-start overflow-y-auto pb-10 w-full">
//         <h1 className="text-subHeading mb-1 bg-green p-1 rounded">TheSolarHome</h1>
//         <p className="text-1xl mb-5 mt-1 ">India's First Solar Calculator</p>

//         {/* Welcome Screen */}
//         {step === -1 ? (
//           <div className="space-y-8 max-w-2xl">
//             <p className="text-base text-white">
//               Welcome to 'The Solar Home', your one stop platform to begin your Solar Journey.
//             </p>
//             <SolarButton className="flex items-center gap-2" onClick={() => setStep(0)}>
//               Sounds Good <ArrowRight className="w-6 h-6" />
//             </SolarButton>
//           </div>
//         ) : (
//           currentQuestion && (
//             <>
//               <div ref={questionRef} className="w-full space-y-1">
//                 <h2 className="text-3xl text-yellow mb-1">{currentQuestion.label}</h2>
//                 <p className="text-para  text-grey mb-1"> ({currentQuestion.description})</p>

//                 {/* Dual Input (Address & Pincode) */}
//                 {currentQuestion.type === "dualInput" && currentQuestion.fields && (
//                   <div className="flex flex-col md:flex-row gap-4 w-full" style={{marginTop:"20px"}}>
//                     {currentQuestion.fields.map((field) => (
//                       <div key={field.key} className="flex-1">
//                         <label className="block text-sm text-gray-300 mb-1">{field.label}</label>
//                         <input
//                           type={field.numeric ? "tel" : "text"}
//                           placeholder={field.placeholder}
//                           value={payload[field.key] || ""}
//                           onChange={(e) => {
//                             if (field.numeric) {
//                               handleNumericInput(e, field.key)
//                             } else {
//                               updatePayload(field.key, e.target.value)
//                             }
//                           }}
//                           onBlur={() => {
//                             if (field.key === "pincode") {
//                               handlePincodeVerification(payload.pincode)
//                             }
//                           }}
//                           onKeyPress={(e) => {
//                             if (field.numeric && !/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
//                               e.preventDefault()
//                             }
//                           }}
//                           className="w-full bg-transparent border border-yellow text-white py-2 p-2 placeholder-gray focus:outline-none focus:border-yellow-300 transition-colors"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Bill Type Radio + Input */}
//                 {currentQuestion.type === "radioInput" && currentQuestion.options && (
//                   <>
//                     <div className="flex flex-col gap-4">
//                       {currentQuestion.options.map((option) => (
//                         <label
//                           key={option.key}
//                           className={`flex items-center gap-3 cursor-pointer border p-4 rounded-lg transition-colors ${
//                             payload.selectedBillType === option.key
//                               ? "border-yellow bg-white/10"
//                               : "border-white/30 hover:border-white/50"
//                           }`}
//                         >
//                           <input
//                             type="radio"
//                             name="billType"
//                             checked={payload.selectedBillType === option.key}
//                             onChange={() => updatePayload("selectedBillType", option.key)}
//                             className="accent-yellow"
//                           />
//                           <span>{option.label}</span>
//                         </label>
//                       ))}
//                     </div>

//                     {payload.selectedBillType && (
//                       <input
//                         type="tel"
//                         placeholder={`Enter ${payload.selectedBillType === "monthlyBill" ? "amount in ₹" : "units in kWh"}`}
//                         className="w-full bg-transparent border-b border-yellow text-white py-3 placeholder-gray mt-4 focus:outline-none focus:border-yellow-300 transition-colors"
//                         value={payload[payload.selectedBillType] || ""}
//                         onChange={(e) => handleNumericInput(e, payload.selectedBillType)}
//                         onKeyPress={(e) => {
//                           if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
//                             e.preventDefault()
//                           }
//                         }}
//                       />
//                     )}
//                   </>
//                 )}

//                 {/* More Info Radio */}
//                 {currentQuestion.type === "radioInfo" && currentQuestion.options && (
//                   <div className="flex flex-col gap-4">
//                     {currentQuestion.options.map((opt) => (
//                       <label
//                         key={opt.key}
//                         className={`border p-4 rounded-lg cursor-pointer transition-colors ${
//                           payload.moreInfoKey === opt.key
//                             ? "border-yellow bg-white/10"
//                             : "border-white/30 hover:border-white/50"
//                         }`}
//                       >
//                         <input
//                           type="radio"
//                           name="moreInfo"
//                           className="mr-3 accent-yellow"
//                           checked={payload.moreInfoKey === opt.key}
//                           onChange={() => {
//                             updatePayload("moreInfo", opt.label)
//                             updatePayload("moreInfoKey", opt.key)
//                           }}
//                         />
//                         <span>{opt.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}

//                 {/* Follow Up Options */}
//                 {currentQuestion.type === "radioFollowup" && currentQuestion.options && (
//                   <div className="flex flex-col gap-4">
//                     {currentQuestion.options.map((opt) => (
//                       <label
//                         key={opt.key}
//                         className={`border p-4 rounded-lg cursor-pointer transition-colors ${
//                           payload.followUpKey === opt.key
//                             ? "border-yellow bg-white/10"
//                             : "border-white/30 hover:border-white/50"
//                         }`}
//                         onClick={() => handleRadioFollowup(opt.key)}
//                       >
//                         <input
//                           type="radio"
//                           name="followUp"
//                           className="mr-3 accent-yellow"
//                           checked={payload.followUpKey === opt.key}
//                           onChange={() => {}}
//                         />
//                         <span>{opt.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}

//                 {/* Default Input */}
//                 {!currentQuestion.type && (
//                   <input
//                     type={
//                       currentQuestion.id === "userEmail"
//                         ? "email"
//                         : currentQuestion.numeric || currentQuestion.id === "userPhone"
//                           ? "tel"
//                           : "text"
//                     }
//                     className="w-full bg-transparent border-b border-yellow text-white placeholder-gray py-3 focus:outline-none focus:border-yellow-300 transition-colors"
//                     placeholder="Type your answer..."
//                     value={payload[currentQuestion.id] || ""}
//                     onChange={(e) => {
//                       if (currentQuestion.numeric || currentQuestion.id === "userPhone") {
//                         handleNumericInput(e, currentQuestion.id)
//                       } else {
//                         updatePayload(currentQuestion.id, e.target.value)
//                       }
//                     }}
//                     onKeyPress={(e) => {
//                       if (
//                         (currentQuestion.numeric || currentQuestion.id === "userPhone") &&
//                         !/[0-9]/.test(e.key) &&
//                         e.key !== "Backspace" &&
//                         e.key !== "Delete"
//                       ) {
//                         e.preventDefault()
//                       }
//                     }}
//                   />
//                 )}

//                 {/* Error Display */}
//                 {error && (
//                   <p className="text-red mt-2 text-sm font-medium" role="alert">
//                     {error}
//                   </p>
//                 )}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex justify-between mt-8 w-full">
//                 <button
//                   onClick={back}
//                   disabled={step === 0 || isSubmitting}
//                   className="rounded-full p-4 bg-white/10 text-white hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
//                   aria-label="Go back"
//                 >
//                   <ArrowLeft className="w-6 h-6" />
//                 </button>

//                 {/* Always show Next/Submit button */}
//                 {isLastStep ? (
//                   <SolarButton onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2">
//                     {isSubmitting ? "Submitting..." : "Submit"}
//                     <Send className="w-6 h-6" />
//                   </SolarButton>
//                 ) : (
//                   <SolarButton onClick={validateAndNext} disabled={isSubmitting} className="flex items-center gap-2">
//                     {currentQuestion.buttonText}
//                     <ArrowRight className="w-6 h-6" />
//                   </SolarButton>
//                 )}
//               </div>
//             </>
//           )
//         )}
//       </div>
//     </div>
//   )
// }
"use client"

import { useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { X, ArrowRight } from "lucide-react"

import { post } from "../utils/api.js"
import { questions } from "../config/questions.js"
import { validateInput, handlePincodeVerification } from "../utils/validation.js"
import { useFormState } from "../hooks/useFormState.js"
import { useFormAnimation } from "../hooks/useFormAnimation.js"
import { ProgressBar } from "./form/ProgressBar.jsx"
import { NavigationButtons } from "./form/NavigationButtons.jsx"
import {
  DualInputQuestion,
  RadioInputQuestion,
  RadioInfoQuestion,
  DefaultInputQuestion,
} from "./form/QuestionTypes.jsx"
import SolarButton from "./SolarButton.jsx"
import solarImage from "../assets/images/modal-image.png"

/**
 * Main Modal Form Component
 * @param {import('../types/form.js').ModalFormProps} props
 */
export default function ModalForm({ onClose }) {
  const navigate = useNavigate()
  const { questionRef, animateIn, animateOut } = useFormAnimation()
  const {
    step,
    setStep,
    payload,
    setPayload,
    error,
    setError,
    isPincodeVerified,
    setIsPincodeVerified,
    isSubmitting,
    setIsSubmitting,
    updatePayload,
    handleNumericInput,
  } = useFormState()

  const getOptionLabel = useCallback((questionId, optionKey) => {
    const question = questions.find((q) => q.id === questionId)
    if (!question || !question.options) return optionKey
    const option = question.options.find((opt) => opt.key === optionKey)
    return option ? option.label : optionKey
  }, [])

  const handleRadioFollowup = useCallback(
    (key) => {
      const optionLabel = getOptionLabel("followUp", key)
      setPayload((prev) => ({ ...prev, followUp: optionLabel, followUpKey: key }))
      setError("")
    },
    [getOptionLabel, setPayload, setError],
  )

  const handlePincodeBlur = useCallback(
    async (pincode) => {
      if (!pincode || !/^[1-9][0-9]{5}$/.test(pincode)) return

      setError("Validating Pincode...")
      try {
        const isValid = await handlePincodeVerification(pincode)
        setIsPincodeVerified(isValid)
        setError("")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Pincode verification failed")
        setIsPincodeVerified(false)
      }
    },
    [setError, setIsPincodeVerified],
  )

  const validateAndNext = useCallback(() => {
    if (isSubmitting) return

    const current = questions[step]
    if (!current) return

    setError("")

    // Handle locationDetails validation
    if (current.id === "locationDetails") {
      const address = payload.address?.trim()
      const pincode = payload.pincode?.trim()

      const addressError = validateInput("address", address)
      if (addressError) return setError(addressError)

      const pincodeError = validateInput("pincode", pincode)
      if (pincodeError) return setError(pincodeError)

      if (!isPincodeVerified) return setError("Please verify your pincode.")

      return animateOut("next", () => setStep((prev) => prev + 1))
    }

    // Handle bill validation
    if (current.id === "bill") {
      const selected = payload.selectedBillType
      if (!selected) return setError("Please select an option.")

      const value = payload[selected]?.trim()
      const billError = validateInput(selected, value)
      if (billError) return setError(billError)

      return animateOut("next", () => setStep((prev) => prev + 1))
    }

    // Handle moreInfo validation
    if (current.id === "moreInfo") {
      if (!payload.moreInfo) return setError("Please select an option.")

      if (payload.moreInfoKey === "option1") {
        return animateOut("next", () => setStep((prev) => prev + 1))
      } else {
        setTimeout(() => handleSubmit(), 1000)
        return
      }
    }

    // Handle followUp validation
    if (current.id === "followUp") {
      if (!payload.followUp) return setError("Please select an option.")

      if (payload.followUpKey === "shared") {
        alert("Thank you so much for your promptness!")
        return handleSubmit()
      } else if (payload.followUpKey === "notHandy") {
        setPayload((prev) => ({ ...prev, awaitingContactDetails: true }))
        return animateOut("next", () => setStep(6))
      } else if (payload.followUpKey === "notWilling") {
        return handleSubmit()
      }

      return animateOut("next", () => setStep((prev) => prev + 1))
    }

    // Handle userPhone validation
    if (current.id === "userPhone") {
      const phoneError = validateInput("userPhone", payload.userPhone)
      if (phoneError) return setError(phoneError)

      if (payload.awaitingContactDetails) {
        return animateOut("next", () => setStep((prev) => prev + 1))
      } else {
        return handleSubmit()
      }
    }

    // Handle userEmail validation
    if (current.id === "userEmail") {
      const emailError = validateInput("userEmail", payload.userEmail)
      if (emailError) return setError(emailError)
      return handleSubmit()
    }

    // Handle default validation
    const value = payload[current.id]?.trim()
    const inputError = validateInput(current.id, value)
    if (inputError) return setError(inputError)

    animateOut("next", () => setStep((prev) => prev + 1))
  }, [step, payload, isPincodeVerified, isSubmitting, animateOut, setStep, setError, setPayload])

  const back = useCallback(() => {
    if (step > 0 && !isSubmitting) {
      setError("")
      animateOut("back", () => setStep((prev) => prev - 1))
    }
  }, [step, isSubmitting, animateOut, setStep, setError])

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return

    setIsSubmitting(true)
    setError("")

    try {
      const finalPayload = {
        ...payload,
      }

      // Handle bill data with proper type indication
      if (payload.selectedBillType) {
        if (payload.selectedBillType === "monthlyBill") {
          finalPayload.billType = "amount"
          finalPayload.billAmount = payload.monthlyBill
          finalPayload.billCurrency = "INR"
        } else if (payload.selectedBillType === "monthlyUnits") {
          finalPayload.billType = "consumption"
          finalPayload.consumptionUnits = payload.monthlyUnits
          finalPayload.consumptionUnit = "kWh"
        }
      }

      // Clean up temporary fields
      delete finalPayload.selectedBillType
      delete finalPayload.monthlyBill
      delete finalPayload.monthlyUnits
      delete finalPayload.awaitingContactDetails
      delete finalPayload.followUpKey
      delete finalPayload.moreInfoKey

      console.log("Final Payload:", finalPayload) // For debugging

      const res = await post("/api/trackSolarDevice", finalPayload)
      navigate("/dashboard", { state: res })
    } catch (err) {
      console.error("Submission error:", err)
      setError("Failed to submit. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }, [payload, isSubmitting, navigate, setIsSubmitting, setError])

  useEffect(() => {
    if (step >= 0 && step < questions.length) {
      animateIn()
    }
  }, [step, animateIn])

  const currentQuestion = step >= 0 && step < questions.length ? questions[step] : null
  const isLastStep = step === questions.length - 1

  const renderQuestionType = () => {
    if (!currentQuestion) return null

    const commonProps = {
      question: currentQuestion,
      payload,
      updatePayload,
      handleNumericInput,
      getOptionLabel,
    }

    switch (currentQuestion.type) {
      case "dualInput":
        return <DualInputQuestion {...commonProps} onPincodeBlur={handlePincodeBlur} />
      case "radioInput":
        return <RadioInputQuestion {...commonProps} />
      case "radioInfo":
        return <RadioInfoQuestion {...commonProps} />
      case "radioFollowup":
        return (
          <div className="flex flex-col gap-4 mt-6">
            {currentQuestion.options?.map((opt) => (
              <label
                key={opt.key}
                className={`border-2 p-6 rounded-xl cursor-pointer transition-all duration-200 ${
                  payload.followUpKey === opt.key
                    ? "border-yellow bg-yellow/10 shadow-lg"
                    : "border-white/30 hover:border-white/50 hover:bg-white/5"
                }`}
                onClick={() => handleRadioFollowup(opt.key)}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="followUp"
                    className="w-5 h-5 mt-1 accent-yellow"
                    checked={payload.followUpKey === opt.key}
                    onChange={() => {}}
                  />
                  <span className="text-lg leading-relaxed">{opt.label}</span>
                </div>
              </label>
            ))}
          </div>
        )
      default:
        return <DefaultInputQuestion {...commonProps} />
    }
  }

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Banner Image with Close Button */}
      <div className="h-[60px] w-full relative mb-4">
        <img
          src={solarImage || "/placeholder.svg"}
          alt="Solar Banner"
          className="w-full h-full object-cover opacity-80"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow z-30 rounded-full border-2 border-white p-2 transition-all duration-200 hover:bg-white/10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <ProgressBar step={step} questions={questions} />

      {/* Content Section */}
      <div className="flex-1 px-6 md:px-10 pt-4 flex flex-col items-start overflow-y-auto pb-10 w-full">
        <h1 className="text-2xl font-bold mb-2 bg-green px-3 py-1 rounded-lg">TheSolarHome</h1>
        <p className="text-xl mb-8 mt-2 text-gray-300">India's First Solar Calculator</p>

        {/* Welcome Screen */}
        {step === -1 ? (
          <div className="space-y-8 max-w-2xl">
            <p className="text-lg text-white leading-relaxed">
              Welcome to 'The Solar Home', your one stop platform to begin your Solar Journey.
            </p>
            <SolarButton className="flex items-center gap-3 text-lg px-8 py-4" onClick={() => setStep(0)}>
              Sounds Good <ArrowRight className="w-6 h-6" />
            </SolarButton>
          </div>
        ) : (
          currentQuestion && (
            <>
              <div ref={questionRef} className="w-full space-y-4">
                <h2 className="text-3xl md:text-4xl text-yellow mb-3 leading-tight">{currentQuestion.label}</h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">({currentQuestion.description})</p>

                {renderQuestionType()}

                {/* Error Display */}
                {error && (
                  <div className="mt-6 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm font-medium" role="alert">
                      ⚠️ {error}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <NavigationButtons
                step={step}
                isLastStep={isLastStep}
                isSubmitting={isSubmitting}
                onBack={back}
                onNext={validateAndNext}
                onSubmit={handleSubmit}
                buttonText={currentQuestion.buttonText}
              />
            </>
          )
        )}
      </div>
    </div>
  )
}
