const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Ping-pong endpoint to check server health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 *                 status:
 *                   type: integer
 *                   example: 200
 */
router.get('/ping', healthController.pingPong);

module.exports = router;
