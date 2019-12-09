const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('../config/cloudinary.config');

module.exports = router;

router.get('/', authMiddleware.isAuthenticated, usersController.index)
router.get('/admin/', authMiddleware.isAdmin, usersController.adminIndex)
router.get('/admin/validate/:userId', authMiddleware.isAdmin, usersController.adminValidate)
router.get('/admin/decline/:userId', authMiddleware.isAdmin, usersController.adminDecline)
router.get('/users/new', usersController.new)

router.get('/login', authMiddleware.isNotAuthenticated, usersController.login)
router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin)
router.post('/logout', authMiddleware.isAuthenticated, usersController.logOut)