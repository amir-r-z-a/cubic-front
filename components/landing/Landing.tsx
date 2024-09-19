import React from "react";
import Image from 'next/image';
import SignIn from "../signin";

export const Landing = () => {
    return (
        <>
            <div className="h-screen  bg-center bg-[url('/images/Frame2.png')] bg-no-repeat bg-cover w-screen">

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
                            <a href="#" className="text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium]">Contact</a>
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

            <div id="games" className="relative flex justify-center h-screen bg-center bg-black-110 bg-cover w-screen">
                <div className="absolute top-[25%]">
                    <SignIn />
                </div>
            </div>

        </>
    );
};