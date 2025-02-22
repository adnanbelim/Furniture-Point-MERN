import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const { token, navigate, cartItems, setCartItems, getCartAmount, delivery_fee, products, backendUrl } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');

  // Take input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      let orderItems = [];

      //for id
      for (const items in cartItems) {
        //for size
        for (const item in cartItems[items]) {
          //check quantity
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      // console.log(orderItems);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod':

          try {
            const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
              headers: { token },
            });

            if (response.data.success) {
              setCartItems({});
              navigate('/orders');
              toast.success(response.data.message);
            } else {
              navigate('/login');
              toast.error(response.data.message);
            }
          } catch (error) {
            // Backend responded with a status
            console.error('Error response:', error.response.data);
            toast.error(error.response.data.message || 'Something went wrong');
          }
          break;

        case 'stripe':
          try {

            const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, orderData, {
              headers: { token }
            });
            // console.log(responseStripe.data);
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
              toast.success(response.data.message);
            } else {
              toast.error(responseStripe.data.message);
            }
          } catch (error) {
            console.error('Error response:', error.response.data);
            toast.error(error.response.data.message || 'Something went wrong');
          }
          break;

        case 'razorpay':
          try {
            const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, {
              headers: { token }
            });
            if (responseRazorpay.data.success) {
              toast.success(responseRazorpay.data.message);
            } else {
              toast.error(responseRazorpay.data.message);
            }
          } catch (error) {
            console.error('Error response:', error.response.data);
            toast.error(error.response.data.message || 'Something went wrong');
          }
          break;


        default:

          break;
      }

    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* --------------------- LEFT SIDE ---------------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        <input onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
          <input onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        </div>
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Zip Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
          <input onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
      </div>
      {/* ----------------------RIGHT SIDE ----------------------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ---------------------- PAYMENT METHOD ----------------------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-gray-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt="" className='h-5 mx-2' />
            </div>
            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-gray-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" className='h-5 mx-2' />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-gray-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type='submit' className='btn-bg text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder