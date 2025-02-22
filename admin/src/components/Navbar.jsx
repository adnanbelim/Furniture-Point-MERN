import React from 'react'
import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom';
const Navbar = ({setToken}) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <Link to='/'>
                <p className="Cilager md:text-[50px] text-2xl md:gap-3 gap-1 flex items-center font-light">
                    FURNITURE
                    <img src={assets.map} alt="" className="md:w-5 w-3" />
                </p>
            </Link>
            <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )
}

export default Navbar