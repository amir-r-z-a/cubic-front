import React from "react";
import Image from 'next/image';
export const Footer = () => {

    return (
        <div className="bg-[rgb(41,41,41)] w-full h-72">
            <div className="container mx-auto flex justify-center items-center py-4 px-6">
                <div>
                    <div className=" flex items-center space-x-5">

                        <p className="text-white font-[poro] font-bold text-2xl">cube</p>

                        <Image src={"/images/logo.png"} width={35} height={38} alt="logo" />

                        <p className="text-white font-[poro] font-bold text-2xl">studio</p>

                    </div>

                </div>

            </div>
            <div className="flex space-x-20 justify-items-center justify-between mx-40 mt-4">
                <a href="#" className="text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium]">Games</a>
                <p className="text-white">|</p>
                <a href="#SignIn" className="text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium]">SignIn / SignUp</a>
                <p className="text-white">|</p>
                <a href="#aboutUs" className="text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium] ">About us</a>
                <p className="text-white">|</p>
                <a href="#" className="text-white hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium]">Our value</a>
            </div>

            <hr className="h-1 mx-20 my-4 bg-gray-100 border-0 rounded mt-10 dark:bg-gray-700"></hr>

            <div className="flex mx-20 justify-between">
                <p className="text-white text-center">© 2024 Cube Studio. All rights reserved.</p>
                <div className="flex">
                    <a className="mr-4" href="#">
                        <Image src={"/images/telegram.png"} width={35} height={35} alt="telegram" />
                    </a>
                    <a className="mr-4" href="#">
                        <Image src={"/images/x.png"} width={35} height={35} alt="x" />
                    </a>
                    <a href="#">
                        <Image src={"/images/linkedin.png"} width={35} height={35} alt="linkedin" />
                    </a>
                </div>
            </div>


        </div>
    )

}