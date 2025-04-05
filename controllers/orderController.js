const Order = require('../models/Order');
const Product = require('../models/Product');


const orderController={}

orderController.createOrder=async (req,res)=>{

    try{
        const userId=req.user.id;
        const { products, address, paymentMethod } = req.body;


        if(!products || products.length===0){
            return res.status(400).json({message:'No products in the order'})
        }

        let totalAmount=0;
        const productDetails=[];

        for(const item of products){
            const product=await Product.findById(item.product);


            if(!product){
                return res.status(404).json({message:`product with id ${item.product} not found`})
            }

            if(product.stock<item.quantity){
                return res.status(400).json({message:`product with id ${item.product} is out of stock`})
            }

            product.stock-=item.quantity;
            await product.save();

            totalAmount+=product.price*item.quantity;

            productDetails.push({
                product:product._id,
                quantity:item.quantity,
            });
        }

        const newOrder=new Order({
            customer:userId,
            products:productDetails,
            totalAmount,
            address,
            paymentMethod,
        });

        await newOrder.save();
        res.status(201).json({message:'Order created successfully',order:newOrder});
 
    }catch(err){
        console.log(err);
        console.error("Order creation error:", err); // this will show the real error in terminal

        res.status(500).json({message:'Internal server error'})
    }
};


module.exports=orderController;

