const Booking = require('../models/Booking');
const Truck = require('../models/Truck');

exports.createBooking = async (req, res) => {
  try {
    const { truckId, startDate, endDate } = req.body;
    const userId = req.user.userId;

    const truck = await Truck.findById(truckId);
    if (!truck) {
      return res.status(404).json({ message: 'Truck not found' });
    }

    // Check if the truck is available for the requested dates
    const isAvailable = truck.availability.some(a => 
      a.startDate <= new Date(startDate) && 
      a.endDate >= new Date(endDate) && 
      a.isAvailable
    );

    if (!isAvailable) {
      return res.status(400).json({ message: 'Truck is not available for the selected dates' });
    }

    // Check if there's an existing booking for the same dates
    const existingBooking = await Booking.findOne({
      truck: truckId,
      $or: [
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } },
        { startDate: { $gte: new Date(startDate), $lte: new Date(endDate) } },
        { endDate: { $gte: new Date(startDate), $lte: new Date(endDate) } }
      ],
      status: { $ne: 'canceled' }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'This truck is already booked for the selected dates' });
    }

    // Calculate total price
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * truck.pricePerDay;

    const booking = new Booking({
      user: userId,
      truck: truckId,
      startDate,
      endDate,
      totalPrice,
      status: 'confirmed' // Automatically set status to confirmed
    });

    await booking.save();

    // Update truck availability
    await Truck.findOneAndUpdate(
      {
        _id: truckId,
        'availability.startDate': { $lte: new Date(startDate) },
        'availability.endDate': { $gte: new Date(endDate) }
      },
      {
        $set: {
          'availability.$.isAvailable': false
        }
      }
    );

    res.status(201).json({
      message: 'Booking confirmed successfully',
      booking: {
        id: booking._id,
        truck: truck.make + ' ' + truck.model,
        startDate: booking.startDate,
        endDate: booking.endDate,
        totalPrice: booking.totalPrice,
        status: booking.status
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate('truck', 'make model year')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('truck')
      .populate('user', 'name email');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user._id.toString() !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await booking.remove();
    // Update truck availability
    await Truck.findByIdAndUpdate(booking.truck, {
      $pull: {
        availability: {
          startDate: booking.startDate,
          endDate: booking.endDate,
          isAvailable: false
        }
      }
    });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTruckBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ truck: req.params.truckId })
      .populate('user', 'name email')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
