require ('dotenv').config();
const express= require('express');
const app=express();


const connectDB= require('./config/dbconnect.config');
const authroutes=require('./routes/auth.routes');

connectDB();
app.use(express.json());

app.use('/auth',authroutes);


app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})




