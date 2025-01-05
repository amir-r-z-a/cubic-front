"use client";
import React, { useState, useEffect } from "react";

export const ContactUs = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    useEffect(() => {
        setIsValidEmail(emailRegex.test(email));
    }, [email]);

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log("Form submitted:", { email, message });
    };

    return (
        <div className="relative p-1 w-[600px] rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-md blur-xl opacity-75"></div>

            <div className="relative bg-gradient-to-r from-red-700 to-orange-400 p-1 rounded-lg">
                <div className="bg-[rgb(53,53,53)] rounded-lg flex flex-col items-center py-10">
                    <h1 className="text-white font-bold font-[IBMPlexSans] text-3xl mb-8">
                        Contact Us
                    </h1>

                    <div className="w-full px-12 grid grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center gap-2 text-[rgb(120,126,142)]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <h2 className="font-bold font-[IBMMedium]">Address</h2>
                                </div>
                                <p className="text-white mt-2">897 Jonathon Field</p>
                                <p className="text-white">Boganburgh</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-[rgb(120,126,142)]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <h2 className="font-bold font-[IBMMedium]">Email</h2>
                                </div>
                                <p className="text-white mt-2">hello@Cubik.Studio.net</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-[rgb(120,126,142)]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <h2 className="font-bold font-[IBMMedium]">Contact phone</h2>
                                </div>
                                <p className="text-white mt-2">+987 654 321 0</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="space-y-6">
                            <div>
                                <label className="text-[rgb(120,126,142)] font-bold font-[IBMMedium]">
                                    Email
                                </label>
                                <div className="mt-2 relative rounded-xl bg-[rgb(53,53,53)] focus-within:border-transparent focus-within:bg-gradient-to-r from-red-700 to-orange-400 p-[2px]">
                                    <input
                                        className="peer focus:ring-transparent text-white w-full p-2 rounded-xl bg-[rgb(72,72,72)] border-none outline-none focus:bg-[rgb(53,53,53)]"
                                        placeholder="Enter your Email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {!isValidEmail && email.length > 0 && (
                                    <p className="text-red-500 mt-1">Please enter a valid email.</p>
                                )}
                            </div>

                            <div>
                                <label className="text-[rgb(120,126,142)] font-bold font-[IBMMedium]">
                                    Message
                                </label>
                                <div className="mt-2 relative rounded-xl bg-[rgb(53,53,53)] focus-within:border-transparent focus-within:bg-gradient-to-r from-red-700 to-orange-400 p-[2px]">
                                    <textarea
                                        className="peer focus:ring-transparent text-white w-full p-2 rounded-xl bg-[rgb(72,72,72)] border-none outline-none focus:bg-[rgb(53,53,53)] min-h-[150px] resize-none"
                                        placeholder="Your message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="relative bg-gradient-to-r from-red-700 to-orange-400 p-1 rounded-full">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isValidEmail || !message}
                                    className={`text-white py-3 flex h-full w-full items-center justify-center bg-gray-800 rounded-full ${
                                        isValidEmail && message
                                            ? "hover:text-orange-400 cursor-pointer"
                                            : "opacity-30 cursor-not-allowed"
                                    } transition-colors duration-200 font-bold font-[IBMMedium]`}
                                >
                                    Send Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;