"use client";

import React, { useState } from "react";

export const SignIn = () => {
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="relative p-1 w-[600px] rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-md blur-xl opacity-75"></div>

            <div className="relative bg-gradient-to-r from-red-700 to-orange-400 p-1 rounded-lg">
                <div className="bg-[rgb(53,53,53)] rounded-lg flex flex-col items-center py-10">
                    <h1 className="text-white font-bold font-[IBMPlexSans] text-3xl mb-4">
                        Sign In
                    </h1>
                    <form noValidate className="flex flex-col items-center">
                        <div className="mb-4 w-full">
                            <label className="text-[rgb(120,126,142)] font-bold font-[IBMMedium] -ml-[30%]">
                                Username
                            </label>
                            <div className="mt-2 relative  rounded-xl w-[150%] -ml-[30%] bg-[rgb(53,53,53)] focus-within:border-transparent focus-within:bg-gradient-to-r from-red-700 to-orange-400 p-[2px]">
                                <input
                                    className="peer focus:ring-transparent  text-white w-full  p-2 rounded-xl bg-[rgb(72,72,72)] border-none outline-none focus:bg-[rgb(53,53,53)]"
                                    placeholder="Enter your username"
                                    type="text"
                                    onChange={(e) => setusername(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="w-full">
                            <label className="text-[rgb(120,126,142)] font-bold font-[IBMMedium] -ml-[30%]">
                                Password
                            </label>
                            <div className="mt-2 w-[150%] -ml-[30%] relative rounded-xl bg-[rgb(53,53,53)] focus-within:border-transparent focus-within:bg-gradient-to-r from-red-700 to-orange-400 p-[2px]">
                                <input
                                    type="password"
                                    className="text-white focus:ring-transparent w-full  p-2 rounded-xl bg-[rgb(72,72,72)] border-none outline-none focus:bg-[rgb(53,53,53)]"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                    <div className="mt-10 relative bg-gradient-to-r from-red-700 to-orange-400 p-1 w-[20%] rounded-full">
                        <div className="text-white py-3 flex h-full w-full items-center justify-center bg-gray-800 rounded-full  hover:text-orange-400 transition-colors duration-200 font-bold font-[IBMMedium]">
                            <button>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
