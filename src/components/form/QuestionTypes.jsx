"use client"

/**
 * Dual input question component (Address & Pincode)
 */
export const DualInputQuestion = ({ question, payload, updatePayload, handleNumericInput, onPincodeBlur }) => {
  if (!question.fields) return null

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full mt-6">
      {question.fields.map((field) => (
        <div key={field.key} className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
          <input
            type={field.numeric ? "tel" : "text"}
            placeholder={field.placeholder}
            value={payload[field.key] || ""}
            maxLength={field.key === "pincode" ? 6 : field.key === "address" ? 200 : undefined}
            onChange={(e) => {
              if (field.numeric) {
                handleNumericInput(e, field.key)
              } else {
                updatePayload(field.key, e.target.value)
              }
            }}
            onBlur={() => {
              if (field.key === "pincode" && onPincodeBlur) {
                onPincodeBlur(payload.pincode || "")
              }
            }}
            onKeyPress={(e) => {
              if (
                field.numeric &&
                !/[0-9]/.test(e.key) &&
                !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
              ) {
                e.preventDefault()
              }
            }}
            className="w-full bg-transparent border-2 border-yellow/60 text-white py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:border-yellow focus:ring-2 focus:ring-yellow/20 transition-all duration-200"
          />
          {field.key === "pincode" && <p className="text-xs text-gray-400 mt-1">Enter 6-digit PIN code</p>}
        </div>
      ))}
    </div>
  )
}

/**
 * Radio input question component (Bill type selection)
 */
export const RadioInputQuestion = ({ question, payload, updatePayload, handleNumericInput }) => {
  if (!question.options) return null

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-col gap-4">
        {question.options.map((option) => (
          <label
            key={option.key}
            className={`flex items-center gap-4 cursor-pointer border-2 p-4 rounded-xl transition-all duration-200 ${
              payload.selectedBillType === option.key
                ? "border-yellow bg-yellow/10 shadow-lg"
                : "border-white/30 hover:border-white/50 hover:bg-white/5"
            }`}
          >
            <input
              type="radio"
              name="billType"
              checked={payload.selectedBillType === option.key}
              onChange={() => updatePayload("selectedBillType", option.key)}
              className="w-5 h-5 accent-yellow"
            />
            <span className="text-lg">{option.label}</span>
          </label>
        ))}
      </div>

      {payload.selectedBillType && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {payload.selectedBillType === "monthlyBill" ? "Monthly Bill Amount (₹)" : "Monthly Consumption (kWh)"}
          </label>
          <input
            type="tel"
            placeholder={`Enter ${payload.selectedBillType === "monthlyBill" ? "amount in ₹" : "units in kWh"}`}
            className="w-full bg-transparent border-2 border-yellow/60 text-white py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:border-yellow focus:ring-2 focus:ring-yellow/20 transition-all duration-200"
            value={payload[payload.selectedBillType] || ""}
            maxLength={payload.selectedBillType === "monthlyBill" ? 7 : 6}
            onChange={(e) => handleNumericInput(e, payload.selectedBillType)}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
                e.preventDefault()
              }
            }}
          />
          <p className="text-xs text-gray-400 mt-1">
            {payload.selectedBillType === "monthlyBill"
              ? "Enter amount between ₹10 - ₹99,99,999"
              : "Enter units between 1 - 9,99,999 kWh"}
          </p>
        </div>
      )}
    </div>
  )
}

/**
 * Radio info question component (More info selection)
 */
export const RadioInfoQuestion = ({ question, payload, updatePayload }) => {
  if (!question.options) return null

  return (
    <div className="flex flex-col gap-4 mt-6">
      {question.options.map((opt) => (
        <label
          key={opt.key}
          className={`border-2 p-6 rounded-xl cursor-pointer transition-all duration-200 ${
            payload.moreInfoKey === opt.key
              ? "border-yellow bg-yellow/10 shadow-lg"
              : "border-white/30 hover:border-white/50 hover:bg-white/5"
          }`}
        >
          <div className="flex items-start gap-4">
            <input
              type="radio"
              name="moreInfo"
              className="w-5 h-5 mt-1 accent-yellow"
              checked={payload.moreInfoKey === opt.key}
              onChange={() => {
                updatePayload("moreInfo", opt.label)
                updatePayload("moreInfoKey", opt.key)
              }}
            />
            <span className="text-lg leading-relaxed">{opt.label}</span>
          </div>
        </label>
      ))}
    </div>
  )
}

/**
 * Default input question component
 */
export const DefaultInputQuestion = ({ question, payload, updatePayload, handleNumericInput }) => {
  const getInputType = () => {
    if (question.id === "userEmail") return "email"
    if (question.numeric || question.id === "userPhone") return "tel"
    return "text"
  }

  const getMaxLength = () => {
    if (question.id === "userPhone") return 10
    if (question.id === "userEmail") return 100
    if (question.id === "roofArea") return 6
    if (question.id === "name") return 50
    return undefined
  }

  const getPlaceholder = () => {
    if (question.id === "name") return "Enter your full name"
    if (question.id === "userPhone") return "Enter 10-digit mobile number"
    if (question.id === "userEmail") return "Enter your email address"
    if (question.id === "roofArea") return "Enter area in square feet"
    return "Type your answer..."
  }

  const getHelpText = () => {
    if (question.id === "userPhone") return "Enter mobile number starting with 6, 7, 8, or 9"
    if (question.id === "roofArea") return "Enter area between 1 - 9,99,999 sqft"
    if (question.id === "name") return "Enter 2-50 characters, letters only"
    return null
  }

  return (
    <div className="mt-6">
      <input
        type={getInputType()}
        className="w-full bg-transparent border-2 border-yellow/60 text-white placeholder-gray-400 py-4 px-4 rounded-lg text-lg focus:outline-none focus:border-yellow focus:ring-2 focus:ring-yellow/20 transition-all duration-200"
        placeholder={getPlaceholder()}
        value={payload[question.id] || ""}
        maxLength={getMaxLength()}
        onChange={(e) => {
          if (question.numeric || question.id === "userPhone") {
            handleNumericInput(e, question.id)
          } else {
            updatePayload(question.id, e.target.value)
          }
        }}
        onKeyPress={(e) => {
          if (
            question.id === "name" &&
            !/[a-zA-Z\s]/.test(e.key) &&
            !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
          ) {
            e.preventDefault()
          }
          if (
            (question.numeric || question.id === "userPhone") &&
            !/[0-9]/.test(e.key) &&
            !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
          ) {
            e.preventDefault()
          }
        }}
      />
      {getHelpText() && <p className="text-xs text-gray-400 mt-2">{getHelpText()}</p>}
    </div>
  )
}
