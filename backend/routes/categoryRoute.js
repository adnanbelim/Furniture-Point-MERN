import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/categoryController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const categoryRouter = express.Router();
// process the middleware upload, multipart of data
categoryRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }]), addProduct);
categoryRouter.post('/remove', removeProduct);
categoryRouter.post('/single', singleProduct);
categoryRouter.get('/list', listProducts);

export default categoryRouter;