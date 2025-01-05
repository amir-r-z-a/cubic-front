"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import SignIn from "../signin";
import Footer from "../footer";
import BodySchema from "../body_schema";
import { ContactUs } from "../contactUs";
import axios from "axios";

export const Landing = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        // Check for existing token on component mount
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token: string) => {
        try {
            const response = await axios.get("http://localhost:8000/api/v0/private/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsername(response.data.user.username);
        } catch (error) {
            localStorage.removeItem("token");
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setUsername(null);
    };

    return (
        <>
            <div className="h-screen bg-center bg-[url('/images/Frame2.png')] bg-no-repeat bg-cover w-screen">
                <nav className="flex h-[127px] bg-center w-full items-center justify-center bg-[url('/images/header.svg')] bg-no-repeat bg-cover">
                    <div className="container mx-auto flex justify-between items-center py-4 px-6 -mt-11">
                        <div className="flex space-x-20 ">
                            <a href="#aboutUs" className="text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium] ">About us</a>
                            <a href="#" className="text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium]">Our value</a>
                        </div>
                        <div>
                            <div className="mt-8 flex items-center space-x-5">
                                <p className="text-white font-[poro] font-bold text-5xl">cube</p>
                                <Image src={"/images/logo.png"} width={73} height={80} alt="logo" />
                                <p className="text-white font-[poro] font-bold text-5xl">studio</p>
                            </div>
                        </div>
                        <div className="flex space-x-20">
                            <a href="#" className="text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium]">Games</a>
                            {username ? (
                                <div className="relative group">
                                    <button 
                                        className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium] rounded-full bg-gradient-to-r from-red-700 to-orange-400 p-[1px]"
                                    >
                                        <div className="flex items-center space-x-2 px-4 py-1 bg-gray-800 rounded-full hover:bg-gray-700">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>Profile</span>
                                        </div>
                                    </button>
                                    
                                    <div className="hidden group-hover:block absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-[rgb(53,53,53)] border border-orange-400">
                                        <div className="py-3">
                                            <div className="px-6 py-3 text-base text-gray-300 border-b border-gray-600">
                                                {username}
                                            </div>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-6 py-3 text-base text-orange-400 hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <a href="#SignIn" className="text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium]">SignIn / SignUp</a>
                            )}
                        </div>
                    </div>
                </nav>
                <div className="w-1/3 pl-32">
                    <h1 className="text-white  font-bold text-6xl mt-40  font-[IBMbold]">Creating A <br /> New Future </h1>
                    <p className="text-white font-[IBMMedium] text-1xl mt-6  ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam facere numquam rerum laborum, ut ducimus temporibus nulla qui, eveniet veniam architecto doloribus neque, perspiciatis repellendus ad quam. Vel, eaque provident?</p>
                    <div className="relative mt-11 p-1 w-40 rounded-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full blur-xl opacity-75"></div>
                        <div className="relative bg-gradient-to-r from-red-700 to-orange-400 p-1 w-full rounded-full">
                            <div className="text-white py-3 flex h-full w-full items-center justify-center bg-gray-800 rounded-full  hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium]">
                                <a href="#">Get Started</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="aboutUs" className="relative h-screen  bg-center bg-[url('/images/aboutUs.png')] bg-no-repeat bg-cover w-screen">
                <h1 className="absolute top-40 left-[660px] text-white  font-bold text-6xl font-[IBMbold]"> about Us </h1>
                <p className="absolute bottom-60 left-[660px] text-white font-[IBMMedium] text-1xl w-2/5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam facere numquam rerum laborum, ut ducimus temporibus nulla qui, eveniet veniam architecto doloribus neque, perspiciatis repellendus ad quam. Vel, eaque provident?</p>
            </div>
            {!username && (
                <div id="SignIn" className="relative flex justify-center h-screen bg-center bg-black-110 bg-cover w-screen">
                    <div className="absolute top-[25%]">
                        <SignIn onSignInSuccess={setUsername} />
                    </div>
                </div>
            )}
            {username && (            <div id="BodySchema" className="relative flex justify-center h-screen bg-center bg-black-110 bg-cover w-screen">
                <div className="absolute ">
                    <BodySchema />
                </div>
            </div>)}

            <div id="ContactUs" className="relative flex justify-center h-screen bg-center bg-black-110 bg-cover w-screen">
                <div className="absolute top-[25%]">
                    <ContactUs />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};