"use client"

import { ArrowLeft, ArrowRight, Send } from "lucide-react"
import SolarButton from "../SolarButton.jsx"

/**
 * Navigation buttons component
 * @param {Object} props
 * @param {number} props.step
 * @param {boolean} props.isLastStep
 * @param {boolean} props.isSubmitting
 * @param {Function} props.onBack
 * @param {Function} props.onNext
 * @param {Function} props.onSubmit
 * @param {string} props.buttonText
 */
export const NavigationButtons = ({ step, isLastStep, isSubmitting, onBack, onNext, onSubmit, buttonText }) => {
  return (
    <div className="flex justify-between items-center mt-10 w-full">
      <button
        onClick={onBack}
        disabled={step === 0 || isSubmitting}
        className="rounded-full p-4 bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border-2 border-white/30 hover:border-white"
        aria-label="Go back"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {isLastStep ? (
        <SolarButton
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-3 text-lg px-8 py-4 min-w-[160px] justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              Submitting...
            </>
          ) : (
            <>
              Submit <Send className="w-6 h-6" />
            </>
          )}
        </SolarButton>
      ) : (
        <SolarButton
          onClick={onNext}
          disabled={isSubmitting}
          className="flex items-center gap-3 text-lg px-8 py-4 min-w-[200px] justify-center"
        >
          {buttonText} <ArrowRight className="w-6 h-6" />
        </SolarButton>
      )}
    </div>
  )
}
