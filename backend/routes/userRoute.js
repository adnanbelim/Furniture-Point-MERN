import express from 'express';
import { loginUser, registerUser, adminLogin, addReview, fetchUserDetails, fetchAllUserDetails } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/review', addReview);
userRouter.get('/fetchuser/:userId', userAuth , fetchUserDetails);
userRouter.get('/fetchalluser', fetchAllUserDetails);

export default userRouter;