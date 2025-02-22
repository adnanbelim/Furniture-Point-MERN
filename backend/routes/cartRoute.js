import express from 'express'
import { addCart, getCart, updateCart } from '../controllers/cartController.js'
import userAuth from '../middleware/userAuth.js';

const cartRouter = express.Router();

cartRouter.post('/add', userAuth, addCart);
cartRouter.post('/get', userAuth, getCart);
cartRouter.post('/update', userAuth, updateCart);

export default cartRouter;