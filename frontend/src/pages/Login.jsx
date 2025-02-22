import { React, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
  const { token, setToken, setUserId, navigate, backendUrl } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState('Login');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          setUserId(response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.id);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          setUserId(response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.id);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }

    } catch (error) {
      console.log(error);
      // Check if the error has a response object (i.e., a server-side error)
      if (error.response) {
        // Axios error with response
        toast.error(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        // No response from server
        toast.error('No response from the server. Please try again later.');
      } else {
        // Any other kind of error
        toast.error(error.message || 'An unknown error occurred');
      }
    }
  };

  // When we have token then navigate to Home
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='flex items-center flex-col w-[90%] sm:max-w-96 m-auto mt-14 gap-4 test-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
      </div>
      {
        currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
      }
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {
          currentState === 'Login' ?
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">Create account</p> :
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Login here</p>
        }
      </div>
      <button className="text-white bg-[#2f0e07] font-light px-8 py-2 mt-4">
        {
          currentState === 'Login' ? 'Sign In' : 'Sign Up'
        }
      </button>
    </form>
  )
}

export default Login