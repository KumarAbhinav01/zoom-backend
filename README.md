# 🚚 Truck Rental API

![Truck Rental Logo](https://st5.depositphotos.com/67903508/65403/v/450/depositphotos_654039314-stock-illustration-digital-illustration-trucking-company-brand.jpg)

## 🌟 Overview

It is a robust API for a truck rental service, designed to streamline the process of renting trucks for various purposes. Our platform connects truck owners with individuals and businesses in need of transportation solutions.

## 🚀 Features

- 🔐 User Authentication & Authorization
- 🚛 Comprehensive Truck Management
- 📍 Location-based Truck Search
- 📅 Advanced Booking System
- 💰 Dynamic Pricing
- 📊 Availability Tracking
- 🌟 User Ratings & Reviews

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **API Documentation**: Swagger / OpenAPI
- **Deployment**: Docker (optional)

## 🏗 Architecture

Truck Rental follows a Model-View-Controller (MVC) architecture, ensuring a clean separation of concerns:

- **Models**: Define data structures for Users, Trucks, Bookings, etc.
- **Controllers**: Handle business logic and request processing
- **Routes**: Define API endpoints and link them to controllers

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/KumarAbhinav01/zoom-backend.git
   ```

2. Install dependencies:
   ```
   cd zoom-backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```
   PORT=8081
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```
   npm start
   ```

## 📚 API Documentation

Access the full API documentation at `http://localhost:8081/api-docs` when the server is running.
