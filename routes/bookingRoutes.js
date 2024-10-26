const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - truck
 *         - startDate
 *         - endDate
 *       properties:
 *         truck:
 *           type: string
 *           description: The ID of the truck being booked
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the booking
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the booking
 *         status:
 *           type: string
 *           enum: [pending, confirmed, canceled]
 *           description: The status of the booking
 * 
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - truckId
 *               - startDate
 *               - endDate
 *             properties:
 *               truckId:
 *                 type: string
 *                 description: The ID of the truck being booked
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the booking
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the booking
 *     responses:
 *       201:
 *         description: Booking confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 booking:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     truck:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *                     totalPrice:
 *                       type: number
 *                     status:
 *                       type: string
 *       400:
 *         description: Invalid input, truck not available, or already booked
 *       404:
 *         description: Truck not found
 *   get:
 *     summary: Get all bookings for the authenticated user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 * 
 * /api/bookings/{id}:
 *   get:
 *     summary: Get a specific booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 *   put:
 *     summary: Update a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, canceled]
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Booking not found
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 * 
 * /api/bookings/truck/{truckId}:
 *   get:
 *     summary: Get all bookings for a specific truck
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: truckId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings for the truck
 */

router.post('/', authMiddleware, bookingController.createBooking);
router.get('/', authMiddleware, bookingController.getBookings);
router.get('/:id', authMiddleware, bookingController.getBooking);
router.put('/:id', authMiddleware, bookingController.updateBooking);
router.delete('/:id', authMiddleware, bookingController.deleteBooking);
router.get('/truck/:truckId', authMiddleware, bookingController.getTruckBookings);

module.exports = router;
