const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  transmission: { type: String, required: true },
  fuelType: { type: String, required: true },
  seats: { type: Number, required: true },
  pricePerHour: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  image: { type: String, required: true },
  features: [String],
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratings: [{ type: Number }],
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now },
  }],
  availability: [{
    date: Date,
    isAvailable: Boolean,
  }],
});

module.exports = mongoose.model('Car', CarSchema);