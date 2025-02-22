import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

// Global variable
const currency = 'inr';
const deliveryCharges = 10;

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing order using COD Method
// Placing order using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Create order data object
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            paymentStatus: 'Pending',  // Payment is pending for COD
            date: Date.now(),
        };

        // Save the new order to the database
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Reset the user's cart after placing the order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Send a response back to the frontend
        res.status(201).json({ message: 'Order placed successfully', success: true, order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error ' + error.message, success: false });
    }
};


// Placing order using Strip Method
const placeOrderStrip = async (req, res) => {
    try {
        //userId taking from userAuth and other field from body
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        }

        // save order in DB
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Stripe fields info...(data comes from frontend as well req.body)
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                // convert dollour into inr for indian rupee
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }));

        //push field data
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1
        })

        //Stripe initialize success or cancle and define mode and send data (line_items)
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.status(201).json({ success: true, session_url: session.url, message: 'Placed Order Successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error ' + error.message, success: false });
    }
}

// Verify Stripe payment
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;
    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.status(201).json({ success: true, message: 'Payment successful' });

        }else{
            await await orderModel.findByIdAndDelete(orderId);
            res.status(201).json({ success: false, message: 'Payment failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error ' + error.message, success: false });
    }
}

// Placing order using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    try {
        res.json({ success: true, message: 'This payment method is currently unavailable. Please try other options.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error ' + error.message, success: false });
    }
}

// All Orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error ' + error.message, success: false });
    }
}

// user Order data for frontend
const userOrders = async (req, res) => {
    try {
        //userId take from userAuth (added in user routes)
        const { userId } = req.body;

        const orders = await orderModel.find({ userId });

        res.status(201).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error ' + error.message, success: false });
    }
}

// Update order status from admin panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status updated' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error ' + error.message, success: false });
    }
}

export { placeOrder, placeOrderStrip, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe };