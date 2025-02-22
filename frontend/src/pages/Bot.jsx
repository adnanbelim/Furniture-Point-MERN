import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

const Bot = () => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedSubOption, setSelectedSubOption] = useState(null);
    const navigate = useNavigate();
    const { userId } = useParams();

    // Fetch bot options from API
    useEffect(() => {
        const fetchBotOptions = async () => {
            try {
                const response = await fetch('/api/bot/options');
                const data = await response.json();
                setOptions(data);
            } catch (error) {
                console.error('Error fetching bot options:', error);
            }
        };

        fetchBotOptions();
    }, []);

    // Handle option click
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setSelectedSubOption(null); // Reset sub-option when changing the option
    };

    // Handle sub-option click
    const handleSubOptionClick = (subOption) => {
        setSelectedSubOption(subOption);
    };

    // Handle sending the email
    const handleSendEmail = () => {
        // You can add functionality to send the email here.
        toast.success('Email sent to Furniture Point');
        navigate('/')
    };

    return (

        <>
            {
                userId ?
                    <div className="w-[100%] text-black bg-slate-200 mt-7" >
                        <div className="h-[10vh] flex align-middle justify-center items-center space-x-4 px-8 py-4 bg-gray-300 duration-300 cursor-pointer">
                            <p className="md:text-[50px] text-2xl md:gap-3 gap-1 text-black flex items-center font-light p-4">
                                Queries
                            </p>
                        </div>
                        <div className="h-[8vh] bg-gray-300">
                            <div className="flex justify-center items-center">
                                <h3 className="flex text-2xl mt-2">
                                    {selectedOption
                                        ? (selectedSubOption ? 'Send mail' : 'Please select a sub-option')
                                        : 'Please select an option'}
                                </h3>
                            </div>
                        </div>


                        <div className="">
                            <div style={{ height: 'calc(78vh - 8vh)' }}>
                                {/* Main options or Sub-options */}
                                {!selectedSubOption ? (
                                    // Display main options or sub-options
                                    !selectedOption ? (
                                        <div className="grid grid-cols-1 gap-10 p-10">
                                            {options.map((option, index) => (
                                                <div
                                                    key={index}
                                                    className="cursor-pointer border p-4 bg-gray-300 hover:bg-gray-500 duration-300"
                                                    onClick={() => handleOptionClick(option)}
                                                >
                                                    <h4 className="text-xl text-center">{option.name}</h4>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        // Show sub-options for selected option
                                        <div className="p-4 ">
                                            <div className="grid grid-cols-1 gap-10 p-10">
                                                {selectedOption.subOptions.map((subOption, subIndex) => (
                                                    <div
                                                        key={subIndex}
                                                        className="cursor-pointer border p-4 bg-gray-300 hover:bg-gray-500 duration-300"
                                                        onClick={() => handleSubOptionClick(subOption)}
                                                    >
                                                        {subOption}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    // Show simple text after sub-option selection
                                    <div className="flex justify-center items-center mt-10">
                                        <div className="text-justify p-4 overflow-hidden bg-white rounded-lg shadow-lg w-1/2">
                                            <h2 className="text-3xl text-black font-semibold">Mail Section</h2>
                                            <form className="mt-4 space-y-6">
                                                <div className="flex flex-col">
                                                    <label className="text-lg text-gray-700" htmlFor="subject">Subject:</label>
                                                    <p id="subject" className="text-xl text-black">{selectedOption.name}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="text-lg text-gray-700" htmlFor="subSubject">Sub-Subject:</label>
                                                    <p id="subSubject" className="text-lg text-black">{selectedSubOption}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="text-lg text-gray-700" htmlFor="userId">User ID:</label>
                                                    <p id="userId" className="text-lg text-black truncate w-1/2">{userId}</p>
                                                </div>
                                                <div className="flex flex-col mt-6">
                                                    <button
                                                        type="button"
                                                        onClick={handleSendEmail}
                                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 duration-300"
                                                    >
                                                        Send Email to Furniture Point
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                )}
                            </div>
                            <p className="t-10 text-black text-center">Our team will notify you within 24 hours.</p>

                            <div className="flex justify-end items-end">
                                <img src={assets.bot} alt="Bot" className="max-w-48 overflow-hidden" />
                            </div>
                        </div>

                    </div> :
                    navigate('/page404')
            }
        </>




    );
};

export default Bot;
