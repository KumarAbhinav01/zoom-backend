const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - city
 *         - state
 *         - zipCode
 *         - coordinates
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the location
 *         address:
 *           type: string
 *           description: The street address of the location
 *         city:
 *           type: string
 *           description: The city of the location
 *         state:
 *           type: string
 *           description: The state of the location
 *         zipCode:
 *           type: string
 *           description: The ZIP code of the location
 *         coordinates:
 *           type: object
 *           required:
 *             - latitude
 *             - longitude
 *           properties:
 *             latitude:
 *               type: number
 *               description: The latitude coordinate
 *             longitude:
 *               type: number
 *               description: The longitude coordinate
 *       example:
 *         name: Downtown Rental Hub
 *         address: 123 Main St
 *         city: Metropolis
 *         state: NY
 *         zipCode: "10001"
 *         coordinates:
 *           latitude: 40.7128
 *           longitude: -74.0060
 * 
 * /api/locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: List of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Created location
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Invalid input
 * 
 * /api/locations/{id}:
 *   get:
 *     summary: Get a location by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The location ID
 *     responses:
 *       200:
 *         description: Location details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 *   put:
 *     summary: Update a location
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The location ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Updated location
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Location not found
 */

router.get('/', locationController.getLocations);
router.post('/', locationController.createLocation);
router.get('/:id', locationController.getLocation);
router.put('/:id', locationController.updateLocation);

module.exports = router;
