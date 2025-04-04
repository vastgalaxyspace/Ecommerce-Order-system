const express=require("express");
const router=express.Router();

const authcontroller=require("../controllers/auth.controllers");



router.post('/register',authcontroller.register);
router.post('/login',authcontroller.login);
router.get('/profile',authcontroller.getprofile);


module.exports=router;