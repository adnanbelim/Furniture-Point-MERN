import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../component/Title';
import ProductItem from '../component/ProductItem';
import { useParams } from 'react-router-dom';

const Collection = () => {
    // get productId from URL
    const { category } = useParams('');
    // create state variable for each product
    const [productData, setProductData] = useState(false);
    // Function to fetch product data
    const fetchProductData = async () => {
        products.map((item) => {
            if (item.category === category) {
                //    console.log(item);
                setProductData(item);
                setImage(item.image[0]);
                return null;
            }
        })
    }
    // Render product data
    useEffect(() => {
        fetchProductData();
    }, [category]);
    // Use context Variables
    const { products, search, showSearch } = useContext(ShopContext);
    // hide and show filter in small screen
    const [showFilter, setShowFilter] = useState(false);
    // State variable
    const [filterProducts, setFilterProducts] = useState([]);
    // Sub-Category Variable
    const [subCategory, setSubCategory] = useState([]);
    // Sort variables
    const [sortType, setSortType] = useState('relavent')

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
        }
        else {
            setSubCategory((prev) => [...prev, e.target.value]);
        }
    }

    const applyFilter = () => {
        // create products array copy using slice()
        let productCopy = products.slice();
        // Logic for search
        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        // Check length category array
        if (category.length > 0) {
            // filter selected category 
            productCopy = productCopy.filter(item => category.includes(item.category));
        }
        // Then filter by subCategory
        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
        }
        setFilterProducts(productCopy);
    }

    // Render filter products
    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch, products]);

    const sortProduct = () => {
        let fpCopy = filterProducts.slice();
        switch (sortType) {
            case 'Low to High':
                setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
                break;
            case 'High to Low':
                setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
                break;
            default:
                applyFilter();
                break;
        }
    }

    // Render sort products
    useEffect(() => {
        sortProduct();
    }, [sortType]);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

            {/* Filter option (Left Side)*/}

            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
                    <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
                </p>

                {/* Subcategory Filter */}

                <div className={`border border-gray-300 pl-5 py-3 my-5 rounded-lg ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-lg text-[#2f0e07] font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3 custom-checkbox' value={'Living Room'} onChange={toggleSubCategory} /> Living Room
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3 custom-checkbox' value={'Bedroom'} onChange={toggleSubCategory} /> Bedroom
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3 custom-checkbox' value={'Office'} onChange={toggleSubCategory} /> Office
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3 custom-checkbox' value={'Dining Room'} onChange={toggleSubCategory} /> Dining Room
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3 custom-checkbox' value={'Outdoor'} onChange={toggleSubCategory} /> Outdoor
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3 custom-checkbox' value={"Children's"} onChange={toggleSubCategory} /> Children
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}

            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />

                    {/* Product sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="Low to High">Sort by: Low to High</option>
                        <option value="High to Low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Map Products */}

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6'>
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem key={index} image={item.image} name={item.name} id={item._id} price={item.price} />
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default Collection
