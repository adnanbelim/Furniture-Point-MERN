import userModel from "../models/userModel.js";


// add cart items
const addCart = async (req, res) => {
    try {
        //userId take from userAuth (It will add automatic by middleware)
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        const cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                //if id && size available than increament the object
                cartData[itemId][size] += 1;
            } else {
                //if size not available than add data to cart
                cartData[itemId][size] = 1;
            }
        } else {
            //create object
            cartData[itemId] = {};
            //add data to cart
            cartData[itemId][size] = 1;
        }

        // Update the DB by id
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.status(201).json({ message: 'Added To Cart', success: false });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' + error.message, success: false });
    }
}

// get cart items
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        const cartData = await userData.cartData;

        // Our Fetch cart data
        res.status(201).json({ success: true, cartData });
        // console.log(cartData);

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' + error.message, success: true });
    }
}

// update cart items
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        const cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        // Update the DB by id
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.status(201).json({ message: 'Updated Cart', success: false });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' + error.message, success: false });
    }
}

export { addCart, getCart, updateCart };