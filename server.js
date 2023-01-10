
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import dotenv  from 'dotenv'
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';


import { generalRouter } from './controllers/general.js';
import { clientRouter } from './controllers/client.js';
// data imports
import User    from "./models/User.js";
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import {
       dataUser ,
       dataProduct ,
       dataProductStat,
       dataTransaction
    } from "./data/index.js";


// package and extenstion
const app = express()
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


// routes
app.use(generalRouter);
app.use(clientRouter);


const connectDB = (url) => {
    return mongoose.connect(url);
}


// Set up database and start the server
const PORT =  process.env.PORT || 9000;
const start = async () => {
    await connectDB(process.env.MONGO_URL);
    console.log("here")
}

app.listen(PORT , ()=>{
    console.log(`Server is listening on port ${PORT} ...`)

    // Only run these code once to avoid the reduplication
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    //Transaction.insertMany(dataTransaction);

})

start();
