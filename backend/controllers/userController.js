import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Route for login route

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "User doesn't exist", success: false });
        }
        const passMatch = await bcrypt.compare(password, user.password);

        if (passMatch) {
            const token = createToken(user._id);
            return res.status(200).json({ message: 'Welcome ' + user.name, token: token, id:user._id, success: true });
        } else {
            return res.status(403).json({ message: 'Invalid credential', success: false });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error ' + error.message, success: false });
    }
}

// Route for register route

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.status(409).json({ message: 'Email already exist', success: false });
        }

        // validator and password hashing...

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Please provide valid email', success: false });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password length must be 8', success: false });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = new userModel({
                name, email, password: hashPassword
            });

            const user = await newUser.save();

            // Create token

            const token = createToken(user._id)
            return res.status(201).json({ message: 'User Register successfully', token: token, id: user._id, success: true });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error ' + error.message, success: false });
    }
}

// Fetch User

const fetchUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by their ID
        const user = await userModel.findById(userId); // Exclude the password from the response
        if (!user) {
            return res.status(404).json({ message: "User data not found", success: false });
        }

        return res.status(200).json({
            message: "User details fetched successfully",
            success: true,
            user: {
                name: user.name,
                email: user.email,
                cartData: user.cartData,
                review: user.review
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error ' + error.message, success: false });
    }
}

//fetch all user

const fetchAllUserDetails = async (req, res) => {
    try {
        const user = await userModel.find({}); // Exclude the password from the response

        return res.status(200).json({
            message: "All user details fetched successfully",
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error ' + error.message, success: false });
    }
}

// Controller for adding or updating user review

const addReview = async (req, res) => {
    try {
        const { userId, review } = req.body;

        // Validate the review text (optional, you can adjust this based on your needs)
        if (!review || review.trim() === "") {
            return res.status(400).json({ message: "Review cannot be empty", success: false });
        }

        // Find the user and update their review
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Update the review
        user.review = review;
        await user.save();

        return res.status(200).json({ message: "Review added successfully", success: true });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error ' + error.message, success: false });
    }
}



// Route for admin login route

const adminLogin = (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.status(201).json({ message: 'Welcome Admin', success: true, token });
        }else{
            return res.status(500).json({ message: 'Invalid credentials', success: false });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error ' + error.message, success: false });
    }
}

export { loginUser, registerUser, adminLogin, addReview, fetchUserDetails, fetchAllUserDetails };