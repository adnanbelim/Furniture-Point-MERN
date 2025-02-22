import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../component/RelatedProducts'

const Product = () => {

  // get productId from URL
  const { productId } = useParams()
  // console.log(productId);
  const { products, currency, addToCart } = useContext(ShopContext);
  // create state variable for each product
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  // Variable for select size
  const [size, setSize] = useState('');
  // Function to fetch product data
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        // console.log(item);
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }
  // Render product data
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 '>
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className='w-full h-auto' />
          </div>
        </div>
        {/* Product Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className="md:w-4/5 text-gray-500 mt-5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Color</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={() => addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">#
            <p>100% Original product.</p>
            <p>Cash on delivery available on this product.</p>
            <p>Easy return and exchange policywithin 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review section */}
      <div className="mt-20">
        <div className="flex">
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Our furniture is crafted with precision and attention to detail, ensuring each piece blends seamlessly into your home or office. With a focus on high-quality materials and exceptional design, we offer durable solutions that stand the test of time. Whether you’re looking for modern minimalism or classic elegance, our collection provides the perfect balance of style and function to elevate any space.</p>
          <p>We pride ourselves on offering a wide variety of furniture that meets the diverse needs of our customers. From comfortable seating to stylish storage, each piece is designed with both aesthetics and practicality in mind. With our commitment to quality craftsmanship and innovative design, our furniture is the perfect choice for anyone looking to create a welcoming, functional, and beautiful environment.</p>
        </div>
      </div>

      {/* Dispay related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className="opacity-0"></div>
}

export default Product