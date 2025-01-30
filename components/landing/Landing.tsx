"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import SignIn from "../signin";
import Footer from "../footer";
import BodySchema from "../body_schema";
import { ContactUs } from "../contactUs";
import axios from "axios";
import ProfileSetup from "../profile_setup/ProfileSetup";
import { useRouter } from 'next/navigation';

export const Landing = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [showProfileSetup, setShowProfileSetup] = useState(false);

    useEffect(() => {
        // Check for existing token on component mount
        const token = localStorage.getItem("token");
        if (token) {
            checkUserProfile(token);
        }
    }, []);

    const checkUserProfile = async (token: string) => {
        try {
            const response = await axios.get("http://localhost:8000/api/v0/private/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            const profile = response.data.profile;

            // Check if required profile fields are complete AND have values
            const isProfileComplete = profile &&
                profile.name?.trim() !== '' &&
                profile.last_name?.trim() !== '' &&
                profile.age > 0 &&
                profile.gender?.trim() !== '';

            if (!isProfileComplete) {
                setShowProfileSetup(true);
                setUsername(null);
            } else {
                setShowProfileSetup(false);
                setUsername(profile.username);
            }
        } catch (error) {
            console.error('Error checking profile:', error);
            localStorage.removeItem("token");
            setUsername(null);
            setShowProfileSetup(false);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setUsername(null);
        setShowProfileSetup(false);
    };

    const handleProfileSetupComplete = () => {
        setShowProfileSetup(false);
        const token = localStorage.getItem('token');
        if (token) {
            checkUserProfile(token);
        }
    };

    const handleProfileClick = () => {
        router.push('/profile');
    };

    return (
        <>
            <div className={`${showProfileSetup ? 'blur-sm' : ''}`}>
                <div className="h-screen bg-center bg-[url('/images/Frame2.png')] bg-no-repeat bg-cover w-screen">
                    <nav className="flex h-[127px] bg-center w-full items-center justify-center bg-[url('/images/header.svg')] bg-no-repeat bg-cover">
                        <div className="container mx-auto flex justify-between items-center py-4 px-6 -mt-11">
                            <div className="flex space-x-20 ">
                                <a href="#aboutUs" className="text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium] ">About us</a>
                                <a href="#ContactUs" className="text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium]">Contact us</a>
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
                                            onClick={handleProfileClick}
                                            className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium] rounded-full bg-gradient-to-r from-red-700 to-orange-400 p-[1px]"
                                        >
                                            <div className="flex items-center space-x-2 px-4 py-1 bg-gray-800 rounded-full hover:bg-gray-700">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span>Profile</span>
                                            </div>
                                        </button>

                                        <div className="hidden group-hover:block absolute w-full h-2 top-full"></div>

                                        <div className="hidden group-hover:block absolute right-0 top-[calc(100%+2px)] w-64 rounded-md shadow-lg bg-[rgb(53,53,53)] border border-orange-400">
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
                        <h1 className="text-white font-bold text-6xl mt-40 font-[IBMbold]">Creating A <br /> New Future </h1>
                        <p className="text-white font-[IBMMedium] text-1xl mt-6">
                            Welcome to Cube Studio, where innovation meets creativity. Our mission is to revolutionize 
                            the way you interact with technology through immersive and engaging experiences. Join us 
                            on a journey to explore new dimensions of gaming and digital interaction, where your 
                            imagination is the only limit.
                        </p>
                        <div className="relative mt-11 p-1 w-40 rounded-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full blur-xl opacity-75"></div>
                            <div className="relative bg-gradient-to-r from-red-700 to-orange-400 p-1 w-full rounded-full">
                                <div className="text-white py-3 flex h-full w-full items-center justify-center bg-gray-800 rounded-full hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium]">
                                    <a href="#">Get Started</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 absolute top-[16%] right-[26%]">
                        <Image
                            src="/images/red_human.png"
                            alt="Direction Icon"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <div id="aboutUs" className="relative h-screen bg-center bg-[url('/images/aboutUs.png')] bg-no-repeat bg-cover w-screen">
                    <h1 className="absolute top-40 left-[660px] text-white font-bold text-6xl font-[IBMbold]">About Us</h1>
                    <p className="absolute bottom-60 left-[660px] text-white font-[IBMMedium] text-1xl w-2/5">
                        At Cube Studio, we are pioneering the integration of healthcare and gamification. Our goal is to 
                        transform traditional health practices into engaging and interactive experiences. By leveraging 
                        the power of games, we aim to motivate individuals to take charge of their health and well-being 
                        in a fun and rewarding way. Join us as we redefine the future of healthcare through innovative 
                        digital solutions.
                    </p>
                    <div className="mt-8 absolute top-[19%] right-[9%] rounded-full overflow-hidden">
                        <Image
                            src="/images/hand.webp"
                            alt="Direction Icon"
                            width={300}
                            height={300}
                        />
                    </div>
                </div>

                {!username && (
                    <div id="SignIn" className="relative flex justify-center h-screen bg-center bg-black-110 bg-cover w-screen">
                        <div className="absolute top-[25%]">
                            <SignIn onSignInSuccess={setUsername} />
                        </div>
                    </div>
                )}
                {username && (<div id="BodySchema" className="relative flex justify-center h-screen bg-center bg-black-110 bg-cover w-screen">
                    <div className="mt-8 absolute bottom-[21%] left-[9%] ">
                        <svg 
                            className="absolute -top-32 -right-20 w-80 h-48 fill-slate-50 opacity-80"
                            viewBox="0 0 122.88 99.7"
                        >
                            <path d="M11.14,41.09A14.74,14.74,0,0,1,9.08,29.66a20.65,20.65,0,0,1,4-8.46,21.64,21.64,0,0,1,7.37-6.06A17.13,17.13,0,0,1,33.28,14a15.88,15.88,0,0,1,7-9.75A26,26,0,0,1,50.87.33a29.13,29.13,0,0,1,11.34.5C66.71,2,70.63,4.29,73,7.85A18.6,18.6,0,0,1,85.93,4.46,27.45,27.45,0,0,1,96.41,7.51a23.2,23.2,0,0,1,8.14,6.82,14.69,14.69,0,0,1,2.89,10.34,15.75,15.75,0,0,1,13.21,8.92,20.43,20.43,0,0,1,2.15,7.48,20.14,20.14,0,0,1-.82,7.8c-1.81,5.73-6.31,10.58-14,12a15.93,15.93,0,0,1-2,8.53,23.52,23.52,0,0,1-8.78,8.8,25.37,25.37,0,0,1-12.74,3.53A22.67,22.67,0,0,1,71.07,77.3c-3.9,3.41-10.59,5.06-17.16,4.93a34.52,34.52,0,0,1-8.32-1.14,21.52,21.52,0,0,1-7.11-3.26,11.24,11.24,0,0,1-4.35-6c-7.44,1.63-13.53.48-18.08-2.23A19.46,19.46,0,0,1,6.58,52.76a17.28,17.28,0,0,1,4.56-11.67ZM7.68,87.85a9.11,9.11,0,0,1,5.18,1.53,5.1,5.1,0,0,1,0,8.79A9.11,9.11,0,0,1,7.68,99.7a9.08,9.08,0,0,1-5.17-1.53,5.1,5.1,0,0,1,0-8" />
                        </svg>
                        <div className="absolute -top-[70px] -right-[8px] w-40 text-center">
                            <p className="text-black-100 font-[IBMMedium] text-sm">Select your game based on the body part</p>
                        </div>
                        <Image
                            src="/images/thinking_blue.png"
                            alt="Direction Icon"
                            width={400}
                            height={600}
                        />
                    </div>
                    <div className="absolute right-[20%]">
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
            </div>
            {showProfileSetup && (
                <ProfileSetup onComplete={handleProfileSetupComplete} />
            )}
        </>
    );
};