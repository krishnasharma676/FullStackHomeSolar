"use client"

import { useState, useCallback } from "react"
import { validationRules } from "../config/validation.js"

/**
 * Custom hook for form state management
 * @returns {Object} Form state and handlers
 */
export const useFormState = () => {
  const [step, setStep] = useState(-1)
  const [payload, setPayload] = useState({})
  const [error, setError] = useState("")
  const [isPincodeVerified, setIsPincodeVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updatePayload = useCallback((key, value) => {
    setPayload((prev) => ({ ...prev, [key]: value }))
    setError("")
  }, [])

  const handleNumericInput = useCallback(
    (e, fieldKey) => {
      const value = e.target.value
      const rule = validationRules[fieldKey]

      // Allow only numbers
      if (!/^\d*$/.test(value)) {
        e.preventDefault()
        return
      }

      // Check max length
      if (rule?.maxLength && value.length > rule.maxLength) {
        return // Don't update if exceeds max length
      }

      // For pincode, don't allow starting with 0
      if (fieldKey === "pincode" && value.length > 0 && value[0] === "0") {
        return
      }

      // For bill and units, don't allow starting with 0 unless it's just "0"
      if (
        (fieldKey === "monthlyBill" || fieldKey === "monthlyUnits" || fieldKey === "roofArea") &&
        value.length > 1 &&
        value[0] === "0"
      ) {
        return
      }

      updatePayload(fieldKey, value)
    },
    [updatePayload],
  )

  return {
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
  }
}
