const mongoose = require('mongoose');

const TariffSchema = new mongoose.Schema({
  state: { type: String, required: true },
  averageTariff: Number,
  highestTariffSlab: { type: Number, required: true }
});

module.exports = mongoose.model('StateElectricityTariffsTable', TariffSchema);
