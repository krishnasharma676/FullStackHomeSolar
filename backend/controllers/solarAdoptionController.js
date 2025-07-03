import AppConfig from "../models/AppConfig.js";
import TariffTable from "../models/StateElectricityTariffsTable.js";
import PincodeTable from "../models/PincodeStateMap.js";

export const solarAdoptionController = async ({ pincode }) => {
  try {
    // Lookup state
    const pincodeDoc = await PincodeTable.findOne({ pincode: pincode.trim() });
    if (!pincodeDoc) throw new Error("State not found for this pincode");
    const stateName = pincodeDoc.statename;

    // Lookup tariff
    const stateTariff = await TariffTable.findOne({
      state: new RegExp(`^${stateName}$`, "i"),
    });
    if (!stateTariff) throw new Error("Tariff not found for this state");
    const currentCharge = stateTariff.highestTariffSlab;

    console.log(currentCharge);
  } catch (error) {
    console.error("Error in solarAdoptionController:", error);
    return { projectedBillNextFiveYears: [], pctIncrease: 0 };
  }
};
