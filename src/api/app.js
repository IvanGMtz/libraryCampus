import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.js';
import  morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
let app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'), cors({
    origin:`http://${process.env.VITE_HOST}:${process.env.VITE_PORT_FRONTEND}`,
    credentials: true
}));
app.use('/', router);

app.listen(process.env.VITE_PORT_BACKEND, process.env.VITE_HOST,  ()=>{
    console.log(`http://${process.env.VITE_HOST}:${process.env.VITE_PORT_BACKEND}`);
});