const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const docsController = require('../controllers/doc.controller')
const catController = require('../controllers/cat.controller')
const departController = require('../controllers/depart.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('../config/cloudinary.config');

module.exports = router;

router.get('/', authMiddleware.isAuthenticated, usersController.index)
router.get('/admin/', authMiddleware.isAdmin, usersController.adminIndex)
router.get('/admin/validate/:userId', authMiddleware.isAdmin, usersController.adminValidate)
router.get('/admin/decline/:userId', authMiddleware.isAdmin, usersController.adminDecline)

router.get('/users/new', authMiddleware.isNotAuthenticated, usersController.new)
router.post('/users/new', authMiddleware.isNotAuthenticated, usersController.create)
router.get('/users/edit', authMiddleware.isAuthenticated, usersController.edit)
router.post('/users/edit', authMiddleware.isAuthenticated, upload.single('avatar'), usersController.doEdit)

router.get('/documents/new', authMiddleware.isAuthenticated, docsController.new)
router.post('/documents/new', authMiddleware.isAuthenticated, upload.single('files'), docsController.doNew)
router.get('/documents/:catFlag/:docId', authMiddleware.isAuthenticated, docsController.show)
router.post('/documents/:docId/edit', authMiddleware.isAuthenticated, docsController.edit)
router.get('/documents/:catFlag', authMiddleware.isAuthenticated, docsController.findByCat)

router.get('/findCategories', authMiddleware.isAuthenticated, catController.findCategories)
router.get('/findDepartments', authMiddleware.isAuthenticated, departController.findDepartments)



router.get('/login', authMiddleware.isNotAuthenticated, usersController.login)
router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin)
router.post('/logout', authMiddleware.isAuthenticated, usersController.logOut)