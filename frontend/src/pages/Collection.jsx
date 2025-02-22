import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../component/Title';
import CategoryItem from '../component/CategoryItem';

const subCategory = () => {

  // Use context Variables
  const { categories, search, showSearch } = useContext(ShopContext);
  // console.log(categories);
  // hide and show filter in small screen
  const [showFilter, setShowFilter] = useState(false);
  // State variable
  const [filterProducts, setFilterProducts] = useState([]);
  // Category Variable
  const [category, setCategory] = useState([]);
  // Sort variables
  const [sortType, setSortType] = useState('relavent')

  // toggle to filter each category
  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      // If it’s selected: It removes the category from the array using the filter method.
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      // If it’s not selected: It adds the category to the array using the spread operator to create a new array that includes the previous items plus the newly added category.
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    // create categories array copy using slice()
    let productCopy = categories.slice();
    // Logic for search
    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    // Check length category array
    if (category.length > 0) {
      // filter selected category 
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    setFilterProducts(productCopy);
  }

  // Render filter products
  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, categories]);

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'A-Z':
        setFilterProducts(fpCopy.sort((a, b) => a.name.localeCompare(b.name)));
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
        {/* Category Filter */}
        <div className={`border border-gray-300 rounded-lg pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-lg font-medium text-[#2f0e07]'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 custom-checkbox' value={'Almira'} onChange={toggleCategory} /> Almira
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 custom-checkbox' value={'Bed'} onChange={toggleCategory} /> Bed
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 custom-checkbox' value={'Bookshelf'} onChange={toggleCategory} /> Bookshelf
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 custom-checkbox' value={'Cabinet'} onChange={toggleCategory} /> Cabinet
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 custom-checkbox' value={'Chair'} onChange={toggleCategory} /> Chair
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 custom-checkbox' value={'Desk'} onChange={toggleCategory} /> Desk
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 custom-checkbox' value={'Nightstand'} onChange={toggleCategory} /> Nightstand
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 custom-checkbox' value={'Sofa'} onChange={toggleCategory} /> Sofa
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 custom-checkbox' value={'Table'} onChange={toggleCategory} /> Table
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 custom-checkbox' value={'Wardrobe'} onChange={toggleCategory} /> Wardrobe
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1">
        <div className="flex-column md:flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTION'} />

          {/* Product sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="A-Z">Sort by: Alphabatic Order</option>
          </select>
        </div>

        {/* Map Products */}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <CategoryItem key={index} image={item.image} name={item.name} id={item._id} category={item.category} />
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default subCategory