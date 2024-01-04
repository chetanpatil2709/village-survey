const express = require("express");
const UserController = require('../controllers/UserController.js')
// import checkUserAuth from '../middleware/authMiddleware.js';

const router = express.Router();
// Middleware
// router.use('/changepass', checkUserAuth)
// router.use('/profile', checkUserAuth)

// Public route
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/update', UserController.updateUser);
router.get('/all', UserController.allUser);
router.get('/exective', UserController.allExective);
router.get('/admin', UserController.allAdmin);
router.get('/user-by-id/:id', UserController.userById);
router.post('/change-user-status/:id', UserController.activeDeactiveUser);

// Protected route
router.post('/changepass', UserController.changeUserPassword);
router.get('/profile', UserController.loggedUser);

module.exports = router;