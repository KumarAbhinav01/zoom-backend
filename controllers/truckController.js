const Truck = require('../models/Truck');

// Get all trucks
exports.getTrucks = async (req, res) => {
  try {
    const { location, startDate, endDate } = req.query;

    // Validate that all required parameters are present
    if (!location || !startDate || !endDate) {
      return res.status(400).json({ message: "Location, startDate, and endDate are required parameters" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Ensure the dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date format. Please use YYYY-MM-DD." });
    }

    // Ensure startDate is not after endDate
    if (start > end) {
      return res.status(400).json({ message: "startDate must be before or equal to endDate" });
    }

    let query = {
      location: location,
      availability: {
        $elemMatch: {
          startDate: { $lte: start },
          endDate: { $gte: end },
          isAvailable: true
        }
      }
    };

    const trucks = await Truck.find(query)
      .select('_id make model year transmission image gallery')
      .lean();

    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new truck
exports.createTruck = async (req, res) => {
  const truck = new Truck(req.body);
  try {
    const newTruck = await truck.save();
    res.status(201).json(newTruck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single truck by ID
exports.getTruck = async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id)
      .populate('location')
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.json(truck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a truck
exports.updateTruck = async (req, res) => {
  try {
    const truck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.json(truck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a truck
exports.deleteTruck = async (req, res) => {
  try {
    const truck = await Truck.findByIdAndDelete(req.params.id);
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.json({ message: 'Truck deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update truck availability
exports.updateTruckAvailability = async (req, res) => {
  try {
    const { truckId, availabilityId } = req.params;
    const { startDate, endDate, isAvailable } = req.body;

    // Convert string dates to Date objects
    const convertedStartDate = startDate ? new Date(startDate) : undefined;
    const convertedEndDate = endDate ? new Date(endDate) : undefined;

    // Validate dates
    if (convertedStartDate && isNaN(convertedStartDate.getTime())) {
      return res.status(400).json({ message: 'Invalid start date format. Use YYYY-MM-DD.' });
    }
    if (convertedEndDate && isNaN(convertedEndDate.getTime())) {
      return res.status(400).json({ message: 'Invalid end date format. Use YYYY-MM-DD.' });
    }

    // Prepare update object
    const updateObj = {};
    if (convertedStartDate) updateObj['availability.$.startDate'] = convertedStartDate;
    if (convertedEndDate) updateObj['availability.$.endDate'] = convertedEndDate;
    if (isAvailable !== undefined) updateObj['availability.$.isAvailable'] = isAvailable;

    const truck = await Truck.findOneAndUpdate(
      { 
        _id: truckId, 
        'availability._id': availabilityId 
      },
      { 
        $set: updateObj
      },
      { new: true }
    );

    if (!truck) {
      return res.status(404).json({ message: 'Truck or availability period not found' });
    }

    res.json(truck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
