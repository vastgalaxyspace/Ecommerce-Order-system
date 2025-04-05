const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/roleMiddleware');


router.post('/', authMiddleware.verifyToken,adminMiddleware.isUser, orderController.createOrder);


module.exports= router;