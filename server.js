
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import dotenv  from 'dotenv'
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';

// package and extenstion
const app = express()

app.use(express.json);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
dotenv.config();

// routes





// Set up database and start the server
const PORT =  process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    app.listen(PORT, ()=> console.log(`Server port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));
