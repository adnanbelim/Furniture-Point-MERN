import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import Title from './Title'

const Footer = () => {
    return (
        <div>
            <div class="px-4 pb-8 pt-10 grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 border-t mt-16 gap-3">
                <div>
                    <p class="font-light text-gray-900 mt-5 md:mt-0 Cilager text-[40px] items-center flex gap-2 w-full">FURNITURE <img src={assets.map} alt="" className='w-5'/></p>
                    <p className='font-medium text-md text-gray-500 mt-4'>
                        We're here to help you define your meaning of home.
                    </p>
                    <p className="mt-2 text-xl">Our Branches</p>
                    <div className="text-justify">
                        <div>
                            {/* India */}
                            <p className="mt-2 inline-flex gap-2">
                                <img src={assets.location} alt="Location" className="w-6" /> Mumbai (India)
                            </p>
                            <p>+91 95XXX3XX12, +91 91XXX4XX21</p>

                            
                            {/* China */}
                            <p className="mt-2 inline-flex gap-2">
                                <img src={assets.location} alt="Location" className="w-6" /> Beijing (China)
                            </p>
                            <p>+86 13XXX5XX78, +86 15XXX6XX89</p>

                            <div className="flex gap-2 mt-2">
                                <Link to="https://wa.me/9521919319" target="_blank" rel="noopener noreferrer">
                                    <p><img src={assets.wp} alt="WhatsApp" className="w-5" /></p>
                                </Link>

                                <Link to="mailto:furniture@gmail.com">
                                    <p><img src={assets.gmail} alt="Email" className="w-5" /></p>
                                </Link>
                            </div>

                            {/* USA */}
                            <p className="mt-2 inline-flex gap-2">
                                <img src={assets.location} alt="Location" className="w-6" /> New York (USA)
                            </p>
                            <p>+1-212XXX4XX56, +1-646XXX5XX67</p>

                            {/* UAE */}
                            <p className="mt-2 inline-flex gap-2">
                                <img src={assets.location} alt="Location" className="w-6" /> Dubai (UAE)
                            </p>
                            <p>+971-50XXX3XX45, +971-55XXX4XX56</p>

                            <div className="flex gap-2 mt-2">
                                <Link to="https://wa.me/9521919319" target="_blank" rel="noopener noreferrer">
                                    <p><img src={assets.wp} alt="WhatsApp" className="w-5" /></p>
                                </Link>

                                <Link to="mailto:furniture@gmail.com">
                                    <p><img src={assets.gmail} alt="Email" className="w-5" /></p>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <p class="font-medium text-gray-900 mt-5 md:mt-0">Links</p>
                    <ul role="list" class="mt-6 flex flex-col space-y-2">
                        <li class="flow-root">
                            <a href="/" class="-m-2 block p-2 text-gray-500">Home</a>
                        </li>
                        <li class="flow-root">
                            <a href="/collection" class="-m-2 block p-2 text-gray-500">Items</a>
                        </li>
                        <li class="flow-root">
                            <a href="/about" class="-m-2 block p-2 text-gray-500">About</a>
                        </li>
                        <li class="flow-root">
                            <a href="/contact" class="-m-2 block p-2 text-gray-500">Contact</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <p class="font-medium text-gray-900 mt-5 lg:mt-0">Categories</p>
                    <ul role="list" class="mt-6 flex flex-col space-y-2">
                        <li class="flow-root">
                            <a href="#" class="-m-2 block p-2 text-gray-500">Almira</a>
                        </li>
                        <li class="flow-root">
                            <a href="#" class="-m-2 block p-2 text-gray-500">Bed</a>
                        </li>
                        <li class="flow-root">
                            <a href="#" class="-m-2 block p-2 text-gray-500">Bookshelf</a>
                        </li>
                        <li class="flow-root">
                            <a href="#" class="-m-2 block p-2 text-gray-500">Cabinet</a>
                        </li>
                        <li class="flow-root">
                            <a href="#" class="-m-2 block p-2 text-gray-500">Chair</a>
                        </li>
                        <li class="flow-root">
                            <a href="#" class="-m-2 block p-2 text-gray-500">Desk</a>
                        </li>
                        <li class="flow-root">
                            <a href="#" class="-m-2 block p-2 text-gray-500">Nightstand</a>
                        </li>
                        <li class="flow-root">
                            <a href="#" class="-m-2 block p-2 text-gray-500">Sofa</a>
                        </li>
                        <li class="flow-root">
                            <a href="#" class="-m-2 block p-2 text-gray-500">Table</a>
                        </li>
                        <li class="flow-root">
                            <a href="#" class="-m-2 block p-2 text-gray-500">Wardrobe</a>
                        </li>
                    </ul>
                </div>
                <div class="grid grid-cols-2 gap-x-4 mt-5 md:mt-0">
                    <div class="group relative text-sm">
                        <img src="https://plus.unsplash.com/premium_photo-1678074057896-eee996d4a23e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnVybml0dXJlfGVufDB8fDB8fHww" alt="" class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75" />
                        <a href="#" class="mt-6 block font-medium text-gray-900">
                            <span class="absolute inset-0 z-10" aria-hidden="true"></span>
                            Latest Collections
                        </a>
                        <p class="mt-1">Shop now</p>
                    </div>
                    <div class="group relative text-sm">
                        <img src="https://images.unsplash.com/photo-1600849128602-c47832664de4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW50aXF1ZSUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D" alt="" class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75" />
                        <a href="#" class="mt-6 block font-medium text-gray-900">
                            <span class="absolute inset-0 z-10" aria-hidden="true"></span>
                            Vintage Collections
                        </a>
                        <p class="mt-1">Shop now</p>
                    </div>
                </div>
            </div>
            <div className='px-4 pb-4 pt-4 border-t mt-8 text-center'>
                <p className="w-full text-gray-800">© 2025 FurniturePoint ~ All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer