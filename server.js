// Simple Express server with Swagger and MVC structure
const express = require("express");
const cors = require("cors"); // Import the cors package
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const healthController = require('./controllers/healthController');
const app = express();
const port = 8081;
require('dotenv').config();
const mongoose = require('mongoose');

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
        title: 'Truck Rental API',
        version: '1.0.0',
        description: 'API for truck rental service',
    },
    servers: [
        {
          url: `http://localhost:${port}`,
          description: 'Local server',
        },
        {
          url: `https://zoom-backend-gvbt.onrender.com`,
          description: 'Production server',
        },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/', require('./routes/healthRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/trucks', require('./routes/truckRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
