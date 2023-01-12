import express from "express";
import OverallStat from "../models/OverallStat.js";
const router = express.Router();


router.get("/api/v1/sales" , async(req,res) => {
    try {
        const overallSales = await OverallStat.find();
        res.status(200).json(overallSales[0]);

    } catch (error) {
        res.status(404).json({message: error.message})
    }



})


export {router as salesRouter}
