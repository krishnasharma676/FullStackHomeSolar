/**
 * @type {import('../types/form.js').Question[]}
 */
export const questions = [
  {
    id: "name",
    label: "What is your full name?",
    description: "So, we can start the healthy conversation with you",
    required: true,
    buttonText: "Here you go",
  },
  {
    id: "locationDetails",
    label: "What is your home address with pincode (where you want your rooftop solar)?",
    description:
      "So we can analyse your roof , run some calculations (for tarrifs, subsidies, and weather data ) in your area and provide accurate results. Sharing Pincode is mandatory to proceed. ",
    required: true,
    type: "dualInput",
    fields: [
      { key: "address", label: "Address", placeholder: "Enter your address" },
      { key: "pincode", label: "Pincode", placeholder: "6-digit PIN", numeric: true },
    ],
    buttonText: "Got it, Make Sense",
  },
  {
    id: "bill",
    label:
      "What's your average monthly electricity bill (in ₹) or Average Monthly Electricity Consumption (Units per Month in kWh)? ",
    description:
      "Typically summer bills are higher then winters. Provide average of your last 12 month bill. This will help suggest the required system size.",
    type: "radioInput",
    required: true,
    options: [
      { key: "monthlyBill", label: "Monthly Bill (₹)", numeric: true },
      { key: "monthlyUnits", label: "Monthly Consumption (kWh)", numeric: true },
    ],
    buttonText: "Curious to see how solar can help me save",
  },
  {
    id: "roofArea",
    label: "Approx. how much shadow free rooftop area (in Sqft) available at your roof? ",
    description:
      "Just to help analyse the solar feasibility of your roof. Generally measured as 'length x breadth' of available roof minus any unavailable space. Please mention area in sqft ( 1 square meter = 10.764 sqft and 1 square gaj = 8.99 sqft ) for accurate results.",
    required: true,
    buttonText: "Here you go",
    numeric: true,
  },
  {
    id: "moreInfo",
    label: "we're so grateful for your time with us so far. ",
    description:
      "We feel like we already know you, but if you have some time and can give us a little more information, we can process your request faster!",
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
    buttonText: "Next",
  },
  {
    id: "followUp",
    label: "Please email your recent electricity bill to hello@thesolarhome.in or Whatsapp to +91 88x xxx xxxx.",
    description:
      "This help us to provide the most accurate results for your home and assess your discom solar support. ",
    type: "radioFollowup",
    required: true,
    options: [
      { key: "shared", label: "Shared the electricity bill, please check" },
      {
        key: "notHandy",
        label: "Not handy now, will share shortly. Please follow up in some time",
      },
      {
        key: "notWilling",
        label: "I don't wish to share at this point. May be later, now please show me the assessment results",
      },
    ],
    buttonText: "Done",
  },
  {
    id: "userPhone",
    label: "What's good phone number to text you later?",
    description: "We may also reach out.",
    required: true,
    buttonText: "Next",
    numeric: true,
  },
  {
    id: "userEmail",
    label: "And what's your best email address? ",
    description: "So we can follow up with you easily.",
    required: true,
    buttonText: "Submit",
  },
]
