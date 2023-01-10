import express from 'express';
import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import Transaction from '../models/Transaction.js';
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

//get Transaction

router.get('/api/v1/client/transactions' , async(req,res) => {
    try {

        // Sort : {"field":"userId", "sort":"desc"}
        // formatted sort should look like {userId: -1}
        // server-side paginaton
        const {page = 1 , pageSize = 20 , sort = null, search = ""} = req.query;

        const generatSort = () => {
            const jsonSort = JSON.parse(sort);
            const sortFormatted = {
                [jsonSort.field]: jsonSort.sort = "asc" ? 1 :-1
            };
            return sortFormatted;
        }
        const sortFormatted = Boolean(sort)? generatSort(sort) : {};

        const transactions = await Transaction.find({
            $or:[
                { cost:   {$regex: new RegExp(search , "i")}},
                { userId: {$regex: new RegExp(search , "i")}}
            ]
        })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize);

        // return the number of result that get searched
        const total = await Transaction.countDocuments({
            name: {$regex: search, $options: 'i'}
        });

        res.status(200).json({
            transactions,
            total
        })


    } catch (error) {

        res.status(404).json({message: error.message})
    }


})


export {router as clientRouter}
