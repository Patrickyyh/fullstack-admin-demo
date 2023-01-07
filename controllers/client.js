import express from 'express';
import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import User from '../models/User.js';
const router = express.Router();

// get Products controller
router.get('/api/v1/client/products', async (req , res) =>{
    try {


        // This method is a bit of slow
        const products = await Product.find();
        const productsWithStat = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat,
                }
            })
        );
         res.status(200).json(productsWithStat)

        // let result = [];
        // for(let i = 0 ; i < products.length ; i++){
        //     let product = products[i]._doc;
        //     const stat = await ProductStat.find({productId : products[i]._id});
        //     result.push({product , stat})

        // }
        // console.log(products[0]._doc);
        // res.status(200).json(result);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }


});

//get customer
router.get('/api/v1/client/customers', async(req , res) => {
    try {
        const customers = await User.find({role: "user"}).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})



export {router as productRouter}
