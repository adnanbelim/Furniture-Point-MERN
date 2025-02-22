import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    // Variable to check visible or not search bar
    const [visible, setVisible] = useState(false);
    //   using the useLocation hook we can get path of the URL
    const location = useLocation();
    useEffect(() => { 
        // console.log(location.pathname)
        if(location.pathname.includes('collection')){
            setVisible(true);
        } 
        else{
            setVisible(false);
        }
    },[location])

    return showSearch && visible ? (
        <div className='bg-gray-50 text-center border-t border-b'>
            <div className="inline-flex items-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
                <img src={assets.search_icon} alt="" className='w-4' />
            </div>
            <img onClick={() => setShowSearch(false)} src={assets.cross_icon} alt="" className='w-3 inline cursor-pointer' />
        </div>
    ) : null
}

export default SearchBar