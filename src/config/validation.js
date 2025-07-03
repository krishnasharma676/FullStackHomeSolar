/**
 * @type {Record<string, import('../types/form.js').ValidationRule>}
 */
export const validationRules = {
  name: {
    regex: /^[a-zA-Z\s]{2,50}$/,
    message: "Enter a valid name (2-50 characters, letters only).",
    maxLength: 50,
  },
  address: {
    regex: /^.{10,200}$/,
    message: "Address must be 10-200 characters.",
    maxLength: 200,
  },
  pincode: {
    regex: /^[1-9][0-9]{5}$/,
    message: "Enter a valid 6-digit PIN",
    maxLength: 6,
    minLength: 6,
  },
  monthlyBill: {
    regex: /^[1-9]\d{1,6}$/,
    message: "Enter valid bill amount (₹10 - ₹9,999,999)",
    maxLength: 7,
  },
  monthlyUnits: {
    regex: /^[1-9]\d{0,5}$/,
    message: "Enter valid units (1 - 999,999 kWh)",
    maxLength: 6,
  },
  roofArea: {
    regex: /^[1-9]\d{0,5}$/,
    message: "Enter rooftop area (1 - 999,999 sqft)",
    maxLength: 6,
  },
  userEmail: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Enter a valid email address",
    maxLength: 100,
  },
  userPhone: {
    regex: /^[6-9]\d{9}$/,
    message: "Enter a valid 10-digit phone number starting with 6-9",
    maxLength: 10,
    minLength: 10,
  },
}
