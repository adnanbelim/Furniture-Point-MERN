import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import Title from './Title'

function Review() {
    const { allUserData } = useContext(ShopContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // console.log(allUserData); //=> all user data 
        if (Array.isArray(allUserData)) {
            const formattedReviews = allUserData
                .filter(user => user.review) // Only include users who have a review
                .map(user => ({
                    name: user.name,
                    text: user.review || "No review yet"
                }));
            // console.log(formattedReviews); //=> all user filter by review 

            setReviews(formattedReviews);
        }
    }, [allUserData]);

    const totalSlides = reviews.length;

    // Auto-slide logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 3000); // Auto-slide every 3 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [totalSlides]);

    const updateIndex = (newIndex) => {
        setCurrentIndex((newIndex + totalSlides) % totalSlides);
    };

    return (
        <div className="mt-10 sm:mt-20 text-xl">
            <Title text1={'OUR'} text2={'REVIEWS'}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20 p-5">
                <div className="relative overflow-hidden w-full justify-center flex flex-col">
                    <div
                        id="carousel"
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {reviews.map((slide, index) => (
                            <div key={index} className="min-w-full flex justify-center items-center">
                                <div className="border rounded-lg shadow box-bg  text-white p-10 sm:p-10 md:p-14 w-full max-w-sm">
                                    <b className="text-lg sm:text-2xl block">{slide.name}</b>
                                    <div className="inline-flex justify-center my-4">
                                        <p className="text-sm sm:text-base">❝ {slide.text} ❞</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => updateIndex(currentIndex - 1)}
                        className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 box-bg  text-white p-2 sm:p-3 rounded-full"
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={() => updateIndex(currentIndex + 1)}
                        className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 box-bg  text-white p-2 sm:p-3 rounded-full"
                    >
                        &#10095;
                    </button>
                </div>
                <div className="relative ad-bg p-5 rounded-lg h-[400px]">
                    <h2 className="absolute top-4 right-4 w-56 text-[#b88b4a] text-md sm:text-lg md:text-xl font-semibold">
                        "Discover, Connect, and Furnish Your Space!"
                    </h2>
                    <Link to='/collection' className="text-sm absolute text-center bottom-4 left-4 p-2 btn-bg text-white rounded-lg w-28">
                        Shop Now
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Review;
