const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('../config/cloudinary.config');

module.exports = router;

router.get('/', authMiddleware.isNotAuthenticated, usersController.login)