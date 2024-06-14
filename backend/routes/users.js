const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', getAllUsers);

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', getUserById);

// @route   PUT api/users
// @desc    Update user
// @access  Private
router.put('/', auth, updateUser);

// @route   DELETE api/users
// @desc    Delete user
// @access  Private
router.delete('/', auth, deleteUser);

module.exports = router;

