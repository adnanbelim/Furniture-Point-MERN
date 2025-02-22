import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Verify() {
    const { token, navigate, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async (req, res) => {
        try {
            if (!token) {
                return null
            }
            const responseStripe = await axios.post(`${backendUrl}/api/order/verifyStripe`, { success, orderId }, { headers: { token } });
            if (responseStripe.data.success) {
                navigate('/orders');
                setCartItems({});
                toast.success(responseStripe.data.message);
            } else {
                navigate('/cart');
                toast.error(responseStripe.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => { verifyPayment() }, [token]);

    return (
        <div>Verify</div>
    )
}

export default Verify