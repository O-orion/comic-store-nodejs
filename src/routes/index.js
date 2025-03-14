const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const comicController = require('../controllers/comicController');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateComic = require('../middlewares/validateComic');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/comics', comicController.getAll);
router.get('/comics/:id', comicController.getById);
router.post('/comics', authMiddleware('admin'), validateComic, comicController.create);
router.put('/comics/:id', authMiddleware('admin'), validateComic, comicController.update);
router.delete('/comics/:id', authMiddleware('admin'), comicController.delete);

router.post('/orders', authMiddleware('customer'), orderController.create);
router.get('/orders', authMiddleware('customer'), orderController.getUserOrders);
router.get('/orders/:id', authMiddleware('customer'), orderController.getById);

module.exports = router;