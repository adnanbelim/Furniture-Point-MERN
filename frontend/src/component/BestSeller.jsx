import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller); //default true accept
        setBestSeller(bestProduct.slice(0,8)); //rendeer only 6 because only 6 has true on property bestseller
    }, [products]);

  return (
    <div className='my-10'>
        <div className="text-center text-3xl py-8">
            <Title text1={"VINTAGE"} text2={"ITEMS"} />
            <p className="m-auto w-3/4 text-xs sm:text-sm md:text-base text-gray-600">
          "Discover timeless vintage furniture that adds character to any home."
            </p>        
        </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6'>
            {
                bestSeller.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }
          </div>

    </div>
  )
}

export default BestSeller