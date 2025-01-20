"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileSetup from '../profile_setup/ProfileSetup';

export const SignIn = ({ onSignInSuccess }: { onSignInSuccess: (username: string) => void }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [showProfileSetup, setShowProfileSetup] = useState(false);

    //
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    useEffect(() => {
        setIsValidEmail(emailRegex.test(email));
    }, [email]);

    
    useEffect(() => {
        setIsValidPassword(password.length >= 6);
    }, [password]);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setError(""); 
    };

    const handleSubmit = async () => {
        try {
            let response;
            if (isSignUp) {
                response = await axios.post("http://localhost:8000/api/v0/public/signup", {
                    username: email,
                    password: password,
                });
                setShowProfileSetup(true);
            } else {
                response = await axios.post("http://localhost:8000/api/v0/public/signin", {
                    username: email,
                    password: password,
                });
                handleSignInSuccess(response.data.token);
            }
            
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            setError("Invalid username or password");
        }
    };

    const handleSignInSuccess = async (token: string) => {
        try {
            const userResponse = await axios.get("http://localhost:8000/api/v0/private/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onSignInSuccess(userResponse.data.user.username);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const handleProfileSetupComplete = () => {
        setShowProfileSetup(false);
        const token = localStorage.getItem('token');
        if (token) {
            handleSignInSuccess(token);
        }
    };

    return (
        <>
            <div className="relative p-1 w-[600px] rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-md blur-xl opacity-75"></div>

                <div className="relative bg-gradient-to-r from-red-700 to-orange-400 p-1 rounded-lg">
                    <div className="bg-[rgb(53,53,53)] rounded-lg flex flex-col items-center py-10">
                        <h1 className="text-white font-bold font-[IBMPlexSans] text-3xl mb-4">
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </h1>
                        <form noValidate className="flex flex-col items-center">
                            <div className="mb-4 w-full">
                                <label className="text-[rgb(120,126,142)] font-bold font-[IBMMedium] -ml-[30%]">
                                    Email
                                </label>
                                <div className="mt-2 relative  rounded-xl w-[150%] -ml-[30%] bg-[rgb(53,53,53)] focus-within:border-transparent focus-within:bg-gradient-to-r from-red-700 to-orange-400 p-[2px]">
                                    <input
                                        className="peer focus:ring-transparent  text-white w-full  p-2 rounded-xl bg-[rgb(72,72,72)] border-none outline-none focus:bg-[rgb(53,53,53)]"
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
                                {!isValidPassword && password.length > 0 && (
                                    <p className="text-red-500 mt-1 text-sm">
                                        Password must at least 6 characters.
                                    </p>
                                )}
                            </div>
                        </form>

                        {error && <p className="text-red-500 mt-4">{error}</p>}

                        <div className="mt-10 relative bg-gradient-to-r from-red-700 to-orange-400 p-1 w-[20%] rounded-full">
                            <div
                                className={`text-white py-3 flex h-full w-full items-center justify-center bg-gray-800 rounded-full ${
                                    isValidEmail && isValidPassword
                                        ? "hover:text-orange-400 cursor-pointer"
                                        : "opacity-30 cursor-not-allowed"
                                } transition-colors duration-200 font-bold font-[IBMMedium]`}
                            >
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isValidEmail || !isValidPassword}
                                >
                                    {isSignUp ? "Sign Up" : "Continue"}
                                </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-white">
                                {isSignUp
                                    ? "Already have an account? "
                                    : "Sign up if you don't have an account"}
                                <span
                                    className="text-orange-400 cursor-pointer ml-2 hover:underline"
                                    onClick={toggleForm}
                                >
                                    {isSignUp ? "Sign In" : "Sign Up"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {showProfileSetup && <ProfileSetup onComplete={handleProfileSetupComplete} />}
        </>
    );
};
