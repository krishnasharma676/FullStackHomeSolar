/**
 * Progress bar component
 * @param {Object} props
 * @param {number} props.step - Current step
 * @param {import('../../types/form.js').Question[]} props.questions - Array of questions
 */
export const ProgressBar = ({ step, questions }) => {
  if (step < 0 || step >= questions.length) return null

  return (
    <div className="w-full px-4 md:px-8 pt-2 pb-2">
      <div className="text-lg font-bold text-white mb-1">
        Question {step + 1} of {questions.length}
      </div>
      <div className="flex gap-1 justify-start">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < step ? "bg-green" : i === step ? "bg-yellow" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
