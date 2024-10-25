const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - make
 *         - model
 *         - year
 *         - transmission
 *         - fuelType
 *         - seats
 *         - pricePerHour
 *         - pricePerDay
 *         - location
 *         - image
 *         - host
 *       properties:
 *         make:
 *           type: string
 *           description: The make of the car
 *         model:
 *           type: string
 *           description: The model of the car
 *         year:
 *           type: integer
 *           description: The year of manufacture
 *         transmission:
 *           type: string
 *           enum: [Manual, Automatic]
 *           description: The transmission type
 *         fuelType:
 *           type: string
 *           enum: [Petrol, Diesel, Electric, Hybrid]
 *           description: The fuel type
 *         seats:
 *           type: integer
 *           description: Number of seats
 *         pricePerHour:
 *           type: number
 *           description: Price per hour in local currency
 *         pricePerDay:
 *           type: number
 *           description: Price per day in local currency
 *         location:
 *           type: string
 *           description: ID of the location where the car is available
 *         image:
 *           type: string
 *           description: URL of the car image
 *         features:
 *           type: array
 *           items:
 *             type: string
 *           description: List of car features
 *         host:
 *           type: string
 *           description: ID of the user hosting the car
 *         ratings:
 *           type: array
 *           items:
 *             type: number
 *           description: List of ratings
 *         reviews:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user who left the review
 *               rating:
 *                 type: number
 *                 description: Rating given in the review
 *               comment:
 *                 type: string
 *                 description: Review comment
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date of the review
 *         availability:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of availability
 *               isAvailable:
 *                 type: boolean
 *                 description: Whether the car is available on this date
 *       example:
 *         make: "Maruti Suzuki"
 *         model: "Wagon R"
 *         year: 2024
 *         transmission: "Manual"
 *         fuelType: "Petrol"
 *         seats: 5
 *         pricePerHour: 100
 *         pricePerDay: 1500
 *         location: "60d725b3e6c8f32b4c9f5d31"
 *         image: "https://example.com/wagonr.jpg"
 *         features: ["Bluetooth", "Air Conditioning", "Power Steering"]
 *         host: "60d725b3e6c8f32b4c9f5d32"
 *         ratings: [4.5, 5, 4.8]
 *         reviews: [
 *           {
 *             user: "60d725b3e6c8f32b4c9f5d33",
 *             rating: 4.5,
 *             comment: "Great car, very comfortable",
 *             date: "2024-03-15T14:30:00Z"
 *           }
 *         ]
 *         availability: [
 *           {
 *             date: "2024-03-20",
 *             isAvailable: true
 *           }
 *         ]
 * 
 * /api/cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter cars by location ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter cars by availability date
 *     responses:
 *       200:
 *         description: List of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Created car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid input
 * 
 * /api/cars/{id}:
 *   get:
 *     summary: Get a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     responses:
 *       200:
 *         description: Car details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 *   put:
 *     summary: Update a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Updated car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Car not found
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     responses:
 *       200:
 *         description: Car deleted
 *       404:
 *         description: Car not found
 */

router.get('/', carController.getCars);
router.post('/', carController.createCar);
router.get('/:id', carController.getCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;