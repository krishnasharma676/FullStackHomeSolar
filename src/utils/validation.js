import { validationRules } from "../config/validation.js"

/**
 * Validates input based on predefined rules
 * @param {string} id - The field identifier
 * @param {any} value - The value to validate
 * @returns {string} Error message or empty string if valid
 */
export const validateInput = (id, value) => {
  const rule = validationRules[id]
  if (!value || !value.toString().trim()) return "This field is required."
  if (rule && !rule.regex.test(value.toString().trim())) return rule.message
  return ""
}

/**
 * Handles pincode verification
 * @param {string} pincode - The pincode to verify
 * @returns {Promise<boolean>} Whether the pincode is valid
 */
export const handlePincodeVerification = async (pincode) => {
  if (!pincode || !validationRules.pincode.regex.test(pincode)) return false

  try {
    // Simulate API call - replace with actual API call when ready
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return true
  } catch (err) {
    throw new Error("Pincode verification failed. Please try again.")
  }
}
