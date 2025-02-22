import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {

    const [text, setText] = useState('View all Sub-Categories');

    const { currency } = useContext(ShopContext);

    // Handle hover start and end to change the text
    const handleMouseEnter = () => setText('CheckOut');
    const handleMouseLeave = () => setText('View all Sub-Categories');

    return (
        <Link className='text-gray-700 cursor-pointer border rounded-lg shadow-md flex flex-col justify-between' to={`/product/${id}`}>
            <div className="overflow-hidden">
                <img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out' />
            </div>
            <div className="p-3">
                <p className='pt-3 pb-1 text-xl mb-2'>{name}</p>
                {
                    <p className='text-md font-medium'>{currency}{price}</p>

                }
            </div>
        </Link>
    )
}

export default ProductItem;
