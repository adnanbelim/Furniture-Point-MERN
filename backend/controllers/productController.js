import cloudinary from 'cloudinary';
import productModel from '../models/productModel.js';
// Add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        // check image available && store image
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        // remove images which is not upload
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // console.log(name, description, price, category, subCategory, sizes, bestseller);
        // console.log(images);

        //store images on cloudinary and then store URL to Database.
        const imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            price: Number(price),
            bestseller: bestseller === 'true' ? true : false,
            image: imageUrl,
            date: Date.now()
        }
        // console.log(productData);
        //Create Model and save in Database
        const product = new productModel(productData);
        await product.save();

        res.status(201).json({ message: 'Product added', success: true });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' + error.message, success: false });
        // console.log(error);

    }
}



// List products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(201).send({ success: true, products });
    } catch (error) {
        return res.status(201).json({ message: 'Internal Server Error' + error.message, success: false });
    }
}

// Remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.status(201).send({ success: true, message: 'Product remove' });
    } catch (error) {
        return res.status(201).json({ message: 'Internal Server Error' + error.message, success: false });
    }
}

// Show single product
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.status(201).json({ success: true, product });
    } catch (error) {
        return res.status(201).json({ message: 'Internal Server Error' + error.message, success: false });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }