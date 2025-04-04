const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken"); 


const JWT_SERECT=process.env.JWT_SERECT;

const authcontroller={}


//For registering a user
authcontroller.register=async(req,res)=>{
const {username,email,password,role}=req.body;
if(!username || !email || !password ){
    return res.status(400).json({message:"Please fill all the fields"})
}

try{

    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"})
    }


    const hashedpassword=await bcrypt.hash(password,10);
    const user=await User({username,email,password:hashedpassword,role});
    await user.save();
    res.status(201).json({message:"User created successfully"});

}catch(error){
    return res.status(500).json({message:error.message})
}
};


//For logging in a user
authcontroller.login=async(req,res)=>{
const {email,password}=req.body;

if(!email || !password){
    return res.status(400).json({message:"Please fill all the fields"})
}

try{

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
    }

    const token=jwt.sign(
        {
            id:user._id,
            email:user.email,
            role:user.role
        },JWT_SERECT,
        {expiresIn:"1h"}
    );

    res.status.json({
        message:"Login successful",
        token,
       role:user.role
    });
}catch(error){
    return res.status(500).json({message:error.message})
}

};

//for getting the profile of a user
authcontroller.getprofile=async(req,res)=>{
    
    try{
        const user=await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(user);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports=authcontroller;