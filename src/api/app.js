import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.js';

dotenv.config();
let app = express();

app.use(express.json());
app.use('/', router);

app.listen( () => {
    console.log(`http://${process.env.VITE_HOST}:${process.env.VITE_PORT_BACKEND}`);
});