import express from 'express'
import { placeOrder, placeOrderStrip, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe } from '../controllers/orderController.js'
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router();

// Admin feature
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment feature
orderRouter.post('/place', userAuth, placeOrder);
orderRouter.post('/stripe', userAuth, placeOrderStrip);
orderRouter.post('/razorpay', userAuth, placeOrderRazorpay);

//verify payment
orderRouter.post('/verifyStripe', userAuth, verifyStripe);

// User feature
orderRouter.post('/userorders', userAuth, userOrders);

export default orderRouter;