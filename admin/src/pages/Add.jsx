import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

function Add({token}) {

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Almira");
    const [subCategory, setSubCategory] = useState("Living Room");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            // append all data in formData format
            const formData = new FormData();

            formData.append("name",name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));
            // append images if they exist
            if (image1) formData.append("image1", image1);
            if (image2) formData.append("image2", image2);
            if (image3) formData.append("image3", image3);
            if (image4) formData.append("image4", image4);

            const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: {token} });
            // console.log(response.data);
            if(response.data.success){
                toast.success(response.data.message);
                setName('');
                setDescription('');
                setPrice('');
                setImage1(null);
                setImage2(null);
                setImage3(null);
                setImage4(null);
            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='text-sm font-medium text-gray-700 mb-2'>Upload Image</p>
                <div className='flex gap-2'>
                    <label htmlFor="image1">
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
                    </label>
                    <label htmlFor="image2">
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
                    </label>
                    <label htmlFor="image3">
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
                    </label>
                    <label htmlFor="image4">
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
                    </label>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-full'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Product Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border focus:border-gray-300 outline-gray-300 rounded-[4px]' type="text" placeholder='Type here' required />
                </div>
                <div className='w-full'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Product Description</p>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border focus:border-gray-300 outline-gray-300 rounded-[4px]' type="text" placeholder='Write content here' required />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 border focus:border-gray-300 outline-gray-300 rounded-[4px]'>
                        <option value="Almira">Almira</option>
                        <option value="Bed">Bed</option>
                        <option value="Bookshelf">Bookshelf</option>
                        <option value="Cabinet">Cabinet</option>
                        <option value="Chair">Chair</option>
                        <option value="Desk">Desk</option>
                        <option value="Nightstand">Nightstand</option>
                        <option value="Sofa">Sofa</option>
                        <option value="Table">Table</option>
                        <option value="Wardrobe">Wardrobe</option>
                    </select>
                </div>
                <div>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Sub category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2 border focus:border-gray-300 outline-gray-300 rounded-[4px]'>
                        <option value="Living Room">Living Room</option>
                        <option value="Bedroom">Bedroom</option>
                        <option value="Office">Office</option>
                        <option value="Dining Room">Dining Room</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Children">Children</option>
                    </select>
                </div>
                <div>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='Enter price' className='w-full px-3 py-2 border focus:border-gray-300 outline-gray-300 rounded-[4px] sm:w-[120px]' />
                </div>
            </div>
            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3'>
                    <div onClick={() => setSizes(prev => prev.includes("BROWN") ? prev.filter(item => item !== "BROWN") : [...prev, "BROWN"])}>
                        <p className={`${sizes.includes("BROWN") ? "bg-slate-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>BROWN</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("BLUE") ? prev.filter(item => item !== "BLUE") : [...prev, "BLUE"])}>
                        <p className={`${sizes.includes("BLUE") ? "bg-slate-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>BLUE</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("PINK") ? prev.filter(item => item !== "PINK") : [...prev, "PINK"])}>
                        <p className={`${sizes.includes("PINK") ? "bg-slate-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>PINK</p>
                    </div>

                    <div onClick={() => setSizes(prev => prev.includes("BLACK") ? prev.filter(item => item !== "BLACK") : [...prev, "BLACK"])}>
                        <p className={`${sizes.includes("BLACK") ? "bg-slate-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>BLACK</p>
                    </div>

                    <div onClick={() => setSizes(prev => prev.includes("GRAY") ? prev.filter(item => item !== "GRAY") : [...prev, "GRAY"])}>
                        <p className={`${sizes.includes("GRAY") ? "bg-slate-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>GRAY</p>
                    </div>

                </div>
            </div>
            <div className='flex gap-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
                <label htmlFor="bestseller" className='cursor-pointer'>Add to unique</label>
            </div>
            <button type='submit' className='bg-black text-white py-3 mt-4 w-28'>ADD</button>
        </form>
    )
}

export default Add