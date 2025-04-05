const express = require('express');
const router = express.Router();

const productController = require('../controllers/Product.controllers');
const isAdmin=require('../middleware/roleMiddleware');
const authmiddleware=require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/',productController.getAllProducts);

router.post('/',authMiddleware.verifyToken,isAdmin.isAdmin,productController.addnewProduct);

router.get('/:id',productController.getproduct);

router.patch('/:id',authMiddleware.verifyToken,isAdmin.isAdmin,productController.updateProduct);


module.exports=router;