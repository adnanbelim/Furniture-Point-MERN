import cloudinary from 'cloudinary';
import categoryModel from '../models/categoryModel.js';
// Add product
const addProduct = async (req, res) => {
    try {
        const { name, category } = req.body;
        // check image available && store image
        const image1 = req.files.image1 && req.files.image1[0];
        // remove images which is not upload
        const images = [image1].filter((item) => item !== undefined);

        // console.log(name, category);
        // console.log(images);

        //store images on cloudinary and then store URL to Database.
        const imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const categoryData = {
            name,
            category,
            image: imageUrl,
        }
        // console.log(categoryData);
        //Create Model and save in Database
        const Category = new categoryModel(categoryData);
        await Category.save();

        res.status(201).json({ message: 'Product added', success: true });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' + error.message, success: false });
        // console.log(error);

    }
}



// List products
const listProducts = async (req, res) => {
    try {
        const Category = await categoryModel.find({});
        res.status(201).send({ success: true, Category });
    } catch (error) {
        return res.status(201).json({ message: 'Internal Server Error' + error.message, success: false });
    }
}

// Remove product
const removeProduct = async (req, res) => {
    try {
        await categoryModel.findByIdAndDelete(req.body.id);
        res.status(201).send({ success: true, message: 'Product remove' });
    } catch (error) {
        return res.status(201).json({ message: 'Internal Server Error' + error.message, success: false });
    }
}

// Show single product
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await categoryModel.findById(productId);
        res.status(201).json({ success: true, product });
    } catch (error) {
        return res.status(201).json({ message: 'Internal Server Error' + error.message, success: false });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }