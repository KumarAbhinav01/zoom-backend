const mongoose = require('mongoose');

const TruckSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  transmission: { type: String, required: true },
  fuelType: { type: String, required: true },
  capacity: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  image: { type: String, required: true },
  features: [String],
  ratings: [{ type: Number }],
  availability: [{
    startDate: Date,
    endDate: Date,
    isAvailable: Boolean,
  }],
});

module.exports = mongoose.model('Truck', TruckSchema);