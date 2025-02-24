import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems, userId } = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        setToken('');
        setCartItems({});
    }

    const handleSearchBar = () => {
        navigate('/collection');
        setShowSearch(!showSearch)
    }

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'>
                <p className="Cilager md:text-[50px] text-2xl md:gap-3 gap-1 flex items-center font-light">
                    FURNITURE
                    <img src={assets.map} alt="" className="md:w-5 w-3" />
                </p>
            </Link>

            <ul className="hidden sm:flex text-sm gap-5 text-gray-700" >
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p className='uppercase'>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#b88b4a] hidden' />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p className='uppercase'>Items</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#b88b4a] hidden' />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p className='uppercase'>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#b88b4a] hidden' />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p className='uppercase'>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#b88b4a] hidden' />
                </NavLink>
            </ul>

            <div className="flex items-center gap-6 ">
                <img onClick={handleSearchBar} src={assets.search_icon} alt="" className='w-5 cursor-pointer' />
                <div className="group relative">
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                    {/* Dropdown Menu */}
                    {
                        token &&
                        <div className="hidden group-hover:block absolute dropdown-menu right-0 pt-4">
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p onClick={() => navigate(`/profile`)} className="cursor-pointer hover:text-black">MyProfile</p>
                                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                                <p onClick={() => navigate(`/bot/${userId}`)} className="cursor-pointer hover:text-black">Customer Support</p>
                                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                            </div>
                        </div>
                    }
                </div>

                <Link to="/cart" className='relative'>
                    <img src={assets.cart_icon} alt="" className='w-5 min-w-4' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden' />
            </div>

            { /* SideBar for small screen*/}

            <div className={`navbar-small-screen absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className="navbar-dromdown flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="navbar-img-div flex items-center gap-4 p-3 cursor-pointer">
                        <img src={assets.dropdown_icon} alt="" className='navbar-img h-4 rotate-180' />
                        <p className='uppercase'>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to="/" className='link-small-screen pl-4 py-2 border uppercase'>Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} to="/collection" className='link-small-screen pl-4 py-2 border uppercase'>Items</NavLink>
                    <NavLink onClick={() => setVisible(false)} to="/about" className='link-small-screen pl-4 py-2 border uppercase'>About</NavLink>
                    <NavLink onClick={() => setVisible(false)} to="/contact" className='link-small-screen pl-4 py-2 border uppercase'>Contact</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Navbar