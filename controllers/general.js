import User from "../models/User.js";
import express from 'express';
const router = express.Router();
router.get('/api/v1/general/user/:id' , async (req,res)=> {
    try {
        const { id } = req.params;
        const user  = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

export {router as generalRouter};
