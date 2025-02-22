import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from './Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { userData, userId, setUserData, backendUrl } = useContext(ShopContext);
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText.trim()) {
      toast.error("Review cannot be empty!");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/user/review`, {
        userId: userId,
        review: reviewText,
      });

      if (response.data.success) {
        toast.success("Review added successfully!");

        // Update the context state with the new review
        setUserData((prev) => ({ ...prev, review: reviewText }));
        setReviewText(''); // Clear input field
      }
    } catch (error) {
      toast.error("Error adding review!");
      console.error("Review error:", error);
    }
  };

  useEffect(() => { handleReviewSubmit() }, [reviewText, userId])

  return (
    <div className='mt-5 text-justify py-8 text-3xl'>
      <Title text1={'YOUR'} text2={'PROFILE'} />

      <div className=" bg-white shadow-md rounded-lg mt-10 justify-between block md:flex">
        <div className='p-10'>
          <h1 className="text-3xl font-bold text-[#2f0e07] mb-4">
            Welcome {userData?.name || 'Guest'}
          </h1>
          <div className="mb-6">
            <p className="text-lg text-[#2f0e07]">
              Email: <span className="font-semibold">{userData?.email || 'N/A'}</span>
            </p>
            <p className="mt-2 text-lg text-[#2f0e07]">
              Review: <span className="font-semibold">{userData?.review || 'No review yet'}</span>
            </p>
          </div>

          {/* Review Input Form */}
          <form onSubmit={handleReviewSubmit} className="mt-4">
            <textarea
              className="w-full sm:w-[400px] p-2 border rounded-md text-lg h-[300px]"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-3 bg-[#2f0e07] text-white p-2 rounded-lg text-sm block"
            >
              Submit Review
            </button>
          </form>
        </div>

        <div>
          <img src={assets.profile_furniture} alt="Profile" className='w-full' />
        </div>
      </div>
    </div>
  );
};

export default Profile;
