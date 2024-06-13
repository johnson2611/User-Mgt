// routes/router.js

const express = require("express");
const router = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

// Define routes
router.get("/", services.homeRoutes);
router.get("/add-user", services.add_user);
router.post("/update-user/:id", controller.updateUser);// Handle POST requests for updating a user
router.get("/update-user/:id", controller.getUserById); // Handle GET requests for fetching a user by ID

// API routes
router.post('/api/users', controller.createUser);
router.get('/api/users', controller.getAllUsers);
router.get('/api/users/:id', controller.getUserById); // Handle GET requests for fetching a user by ID
router.put('/api/users/:id', controller.updateUser); // Handle PUT requests for updating a user
router.delete('/api/users/:id', controller.deleteUser); // Handle DELETE requests for deleting a user

module.exports = router;
