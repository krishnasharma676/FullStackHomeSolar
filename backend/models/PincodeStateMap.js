const mongoose = require('mongoose');

const PincodeStateSchema = new mongoose.Schema({
  pincode: { type: String, required: true },
  statename: { type: String, required: true }
});

module.exports = mongoose.model('PincodeStateMap', PincodeStateSchema);
