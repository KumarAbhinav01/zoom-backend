const Car = require('../models/Car');

// Get all cars
exports.getCars = async (req, res) => {
  try {
    let query = {};
    if (req.query.location) {
      query.location = req.query.location;
    }
    if (req.query.date) {
      query['availability.date'] = req.query.date;
      query['availability.isAvailable'] = true;
    }
    const cars = await Car.find(query).populate('location').populate('host', 'name');
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new car
exports.createCar = async (req, res) => {
  const car = new Car(req.body);
  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single car by ID
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('location')
      .populate('host', 'name')
      .populate('reviews.user', 'name');
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a car
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};