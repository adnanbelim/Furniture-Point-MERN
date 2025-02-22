import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import botRouter from './routes/botRoute.js'

// App Config
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// Connection of Mongo and Cloudinary
connectDB();
connectCloudinary();

// api endpoint
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);
app.use('/api/bot', botRouter);

app.get('/', (req, res) => {
    res.send('Endpoint Hit!!');
});

// PORT Listen
app.listen(PORT, (error) => {
    if(error) return console.error(error);
    console.log(`PORT running on ${PORT}`);
});