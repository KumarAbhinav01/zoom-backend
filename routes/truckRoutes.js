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
 *         - host
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
 *           description: URL of the truck image
 *         features:
 *           type: array
 *           items:
 *             type: string
 *           description: List of truck features
 *         host:
 *           type: string
 *           description: ID of the user hosting the truck
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
 *         image: "https://example.com/tata-ace.jpg"
 *         features: ["GPS Tracking", "Air Conditioning", "Power Steering"]
 *         host: "60d725b3e6c8f32b4c9f5d32"
 *         ratings: [4.5, 5, 4.8]
 *         reviews: [
 *           {
 *             user: "60d725b3e6c8f32b4c9f5d33",
 *             rating: 4.5,
 *             comment: "Great truck, very reliable",
 *             date: "2024-03-15T14:30:00Z"
 *           }
 *         ]
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
 *     example:
 *       - location: "60d725b3e6c8f32b4c9f5d31"
 *       - startDate: "2024-03-20"
 *       - endDate: "2024-03-25"
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
 *                     description: URL of the truck image
 *             example:
 *               - _id: "671bb7cb2a0cdf263bed1911"
 *                 make: "Tata"
 *                 model: "Ace"
 *                 year: 2024
 *                 transmission: "Manual"
 *                 image: "https://smalltrucks.tatamotors.com/sites/default/files/product/images/2%20Ace%20Gold%20CNG%20Plus.png"
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
 */

router.get('/', truckController.getTrucks);
router.post('/', truckController.createTruck);
router.get('/:id', truckController.getTruck);
router.put('/:id', truckController.updateTruck);
router.delete('/:id', truckController.deleteTruck);

module.exports = router;
