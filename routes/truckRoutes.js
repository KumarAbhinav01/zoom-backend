const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Truck:
 *       type: object
 *       required:
 *         - make
 *         - model
 *         - year
 *         - transmission
 *         - fuelType
 *         - capacity
 *         - pricePerDay
 *         - location
 *         - image
 *       properties:
 *         make:
 *           type: string
 *           description: The make of the truck
 *         model:
 *           type: string
 *           description: The model of the truck
 *         year:
 *           type: integer
 *           description: The year of manufacture
 *         transmission:
 *           type: string
 *           enum: [Manual, Automatic]
 *           description: The transmission type
 *         fuelType:
 *           type: string
 *           enum: [Diesel, Petrol, Electric, Hybrid]
 *           description: The fuel type
 *         capacity:
 *           type: string
 *           description: The carrying capacity of the truck
 *         pricePerDay:
 *           type: number
 *           description: Price per day in local currency
 *         location:
 *           type: string
 *           description: ID of the location where the truck is available
 *         image:
 *           type: string
 *           description: URL of the main truck image
 *         gallery:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of additional truck images
 *         features:
 *           type: array
 *           items:
 *             type: string
 *           description: List of truck features
 *         ratings:
 *           type: array
 *           items:
 *             type: number
 *           description: List of ratings
 *         availability:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of availability
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of availability
 *               isAvailable:
 *                 type: boolean
 *                 description: Whether the truck is available during this period
 *       example:
 *         make: "Tata"
 *         model: "Ace"
 *         year: 2024
 *         transmission: "Manual"
 *         fuelType: "Diesel"
 *         capacity: "1 ton"
 *         pricePerDay: 2000
 *         location: "60d725b3e6c8f32b4c9f5d31"
 *         image: "https://example.com/tata-ace-main.jpg"
 *         gallery: [
 *           "https://example.com/tata-ace-side.jpg",
 *           "https://example.com/tata-ace-interior.jpg"
 *         ]
 *         features: ["GPS Tracking", "Air Conditioning", "Power Steering"]
 *         ratings: [4.5, 5, 4.8]
 *         availability: [
 *           {
 *             startDate: "2024-03-20",
 *             endDate: "2024-03-25",
 *             isAvailable: true
 *           }
 *         ]
 * 
 * /api/trucks:
 *   get:
 *     summary: Get all available trucks
 *     tags: [Trucks]
 *     parameters:
 *       - in: query
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: Filter trucks by location ID
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date of rental period
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date of rental period
 *     responses:
 *       200:
 *         description: List of available trucks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The truck ID
 *                   make:
 *                     type: string
 *                     description: The make of the truck
 *                   model:
 *                     type: string
 *                     description: The model of the truck
 *                   year:
 *                     type: integer
 *                     description: The year of manufacture
 *                   transmission:
 *                     type: string
 *                     description: The transmission type
 *                   image:
 *                     type: string
 *                     description: URL of the main truck image
 *                   gallery:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: URLs of additional truck images
 *             example:
 *               - _id: "671bb7cb2a0cdf263bed1911"
 *                 make: "Tata"
 *                 model: "Ace"
 *                 year: 2024
 *                 transmission: "Manual"
 *                 image: "https://example.com/tata-ace-main.jpg"
 *                 gallery: [
 *                   "https://example.com/tata-ace-side.jpg",
 *                   "https://example.com/tata-ace-interior.jpg"
 *                 ]
 *       400:
 *         description: Missing required parameters
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new truck
 *     tags: [Trucks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Truck'
 *     responses:
 *       201:
 *         description: Created truck
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Truck'
 *       400:
 *         description: Invalid input
 * 
 * /api/trucks/{id}:
 *   get:
 *     summary: Get a truck by ID
 *     tags: [Trucks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The truck ID
 *     responses:
 *       200:
 *         description: Truck details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Truck'
 *       404:
 *         description: Truck not found
 *   put:
 *     summary: Update a truck
 *     tags: [Trucks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The truck ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Truck'
 *     responses:
 *       200:
 *         description: Updated truck
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Truck'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Truck not found
 *   delete:
 *     summary: Delete a truck
 *     tags: [Trucks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The truck ID
 *     responses:
 *       200:
 *         description: Truck deleted
 *       404:
 *         description: Truck not found
 * /api/trucks/{truckId}/availability/{availabilityId}:
 *   put:
 *     summary: Update a specific availability period for a truck
 *     tags: [Trucks]
 *     parameters:
 *       - in: path
 *         name: truckId
 *         required: true
 *         schema:
 *           type: string
 *         description: The truck ID
 *       - in: path
 *         name: availabilityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The availability period ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of availability (YYYY-MM-DD)
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of availability (YYYY-MM-DD)
 *               isAvailable:
 *                 type: boolean
 *                 description: Whether the truck is available during this period
 *           example:
 *             startDate: "2024-05-23"
 *             endDate: "2024-06-01"
 *             isAvailable: false
 *     responses:
 *       200:
 *         description: Updated truck
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Truck'
 *       400:
 *         description: Invalid input or date format
 *       404:
 *         description: Truck or availability period not found
 */

router.get('/', truckController.getTrucks);
router.post('/', truckController.createTruck);
router.get('/:id', truckController.getTruck);
router.put('/:id', truckController.updateTruck);
router.delete('/:id', truckController.deleteTruck);
router.put('/:truckId/availability/:availabilityId', truckController.updateTruckAvailability);

module.exports = router;
