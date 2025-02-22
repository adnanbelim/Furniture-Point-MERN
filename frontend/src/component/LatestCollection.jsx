import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    // useContext Share value of provider in entire componbent tree 
    const { products } = useContext(ShopContext);
    // console.log(products);

    // get 10 products from products list (logic)
    const [latestProducts, setLatestProducts] = useState([]);
    // This function executes once when page loaded
    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])


    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={"LATEST"} text2={"COLLECTION"} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    "Explore the latest furniture trends for modern living spaces."
                </p>
            </div>

            {/* we will create the a component to get items from context like currency and products etc then display here */}
            {/* Rendering Products */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCollection