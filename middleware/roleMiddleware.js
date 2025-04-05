const roleMiddleware={};

roleMiddleware.isAdmin=(req,res,next)=>{
    if(req.user.role==="admin"){
        next();
    }else{
        res.status(403).json({message:"Access denied:Admin only"});
    }
   
}

roleMiddleware.isUser=(req,res,next)=>{
    if(req.user.role==="customer"){
        next();
    }else{
        res.status(403).json({message:"Access denied:User only"});
    }
   
}
module.exports=roleMiddleware;
