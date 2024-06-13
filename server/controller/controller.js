// controller/controller.js

const User = require('../model/User'); // Import your User model

// Create and save a new user
exports.createUser = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty" });
    }

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // Save user in the database
    user.save()
        .then(data => {
            res.redirect("/add-user");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a user."
            });
        });
};

// Retrieve and return all users or a single user
exports.getAllUsers = (req, res) => {
    if (req.query.id) {
        // Retrieve a single user by ID
        const id = req.query.id;
        User.findById(id)
            .then(user => {
                if (!user) {
                    res.status(404).send({ message: `User with ID ${id} not found` });
                } else {
                    res.send(user);
                }
            })
            .catch(err => {
                res.status(500).send({ message: `Error retrieving user with ID ${id}` });
            });
    } else {
        // Retrieve all users
        User.find()
            .then(users => {
                res.send(users);
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving users" });
            });
    }
};

// Update a user by ID
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const updateData = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    };

    // Use Mongoose's findByIdAndUpdate or similar method to update the user
    User.findByIdAndUpdate(userId, updateData, { useFindAndModify: false })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).send({ message: `User with ID ${userId} not found.` });
            }
            res.send({ message: "User updated successfully.", updatedUser });
        })
        .catch(err => {
            console.error("Error updating user:", err);
            res.status(500).send({ message: "Error updating user." });
        });
};


// Delete a user by ID
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `User with ID ${id} not found.` });
            } else {
                res.send({ message: "User deleted successfully." });
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error deleting user with ID ${id}` });
        });
};

// Get a user by ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.error("Error fetching user:", err);
            res.status(500).json({ message: "Error fetching user." });
        });
};
 