const roleMiddleware={};

roleMiddleware.isAdmin=(req,res,next)=>{
    if(req.user.role==="admin"){
        next();
    }else{
        res.status(403).json({message:"Access denied:Admin only"});
    }
   
}
module.exports=roleMiddleware;
