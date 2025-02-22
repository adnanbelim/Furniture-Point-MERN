import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  }
  return (
    <div className='flex flex-col items-end border bg-letter p-16 rounded-3xl'>
      <div className='text-center w-full sm:w-1/2'>
        <p className="text-3xl font font-medium text-[#ffffff]">Let's Stay Connected</p>
        <p className="mt-3 text-[#ffffff]">Sign up to hear about our latest sales, new arrivals & more.</p>
      </div>

      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 block md:flex gap-3 my-6 border md:pl-3 pl-0 bg-white rounded-lg'>
        <input className='w-full md:flex-1 outline-none bg-transparent p-3 md:p-0' type="email" placeholder='Enter your email' required />
        <button type='submit' className='btn-bg text-white text-xs px-10 py-4 rounded-lg md:w-36 w-full'>SUSCRIBE</button>
      </form>

    </div>
  )
}

export default NewsletterBox