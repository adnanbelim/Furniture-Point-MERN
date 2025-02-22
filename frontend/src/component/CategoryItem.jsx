import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const CategoryItem = ({ id, image, name, category }) => {

    const [text, setText] = useState('View all Sub-Categories');
    // Handle hover start and end to change the text
    const handleMouseEnter = () => setText('CheckOut');
    const handleMouseLeave = () => setText('View all Sub-Categories');

    return (
        <Link className='text-gray-700 cursor-pointer border rounded-lg shadow-md flex flex-col justify-between' to={`/category/${category}`}>
            <div className="overflow-hidden">
                <img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out' />
            </div>
            <div className="p-3">
                <p className='pt-3 pb-1 text-xl mb-2'>{name}</p>
                {
                    <button
                        onMouseEnter={handleMouseEnter}  // Trigger state change on hover
                        onMouseLeave={handleMouseLeave}  // Reset the text when hover ends
                        className="text-white bg-transparent hover:text-white p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black btn-bg text-sm"
                    >
                        {text}
                    </button>
                }
            </div>
        </Link>
    )
}

export default CategoryItem;
