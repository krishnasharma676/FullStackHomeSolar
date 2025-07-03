import PincodeTable from "../models/PincodeStateMap.js";
import StateAdoptionTable from "../models/StateAdoptionTable.js";

export const solarAdoptionController = async ({pincode}) => {
  try {
    const pincodeString = String(pincode).trim();
    console.log("pincode-> yser",pincodeString);
    

    // Step 1: Get State from Pincode
    const pincodeDoc = await PincodeTable.findOne({ pincode: pincodeString });
    console.log("pincode-> doc",pincodeDoc);
    if (!pincodeDoc || !pincodeDoc.statename) {
      throw new Error("State not found for this pincode");
    }

    const stateName = String(pincodeDoc.statename).trim();

    
    const adoptionDoc = await StateAdoptionTable.findOne({
      state: new RegExp(`^${stateName}$`, "i"),
    });
    
    console.log("State found for Pincode:", stateName);
console.log("adoptionDoc----", adoptionDoc);

if (!adoptionDoc || typeof adoptionDoc.total_score !== "number") {
  throw new Error("Solar Adoption Score not found for this state");
}

const adoptionScore = adoptionDoc.total_score;

return { adoptionScore };


  } catch (err) {
    console.error("Error in solarAdoptionController:", err);
    return { state: null, totalScore: null, error: err.message };
  }
};
