"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PreGame1() {
  const router = useRouter();

  return (
    <div className="bg-dark-100 min-h-screen flex flex-col items-center py-12">
      <div className="max-w-4xl w-full px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl text-white font-bold mb-4">Face Expression Game</h1>
          <p className="text-orange-400 text-xl">Master your facial movements</p>
        </div>

        {/* Main Content */}
        <div className="bg-[rgb(53,53,53)] rounded-lg p-8 shadow-lg">
          {/* Game Preview Image */}
          <div className="relative h-[300px] mb-8 rounded-lg overflow-hidden">
            <Image 
              src="/images/fig1.png"
              fill
              style={{ objectFit: 'cover' }}
              alt="Game Preview"
              className="rounded-lg"
            />
          </div>

          {/* Game Description */}
          <div className="text-white space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-3">About the Game</h2>
              <p className="text-gray-300 leading-relaxed">
                Face Expression Game helps you improve your facial muscle control through fun and engaging exercises. 
                Track your facial movements in real-time and complete various challenges.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">How to Play</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Position yourself in front of the camera</li>
                <li>Follow the on-screen instructions</li>
                <li>Mirror the facial expressions shown</li>
                <li>Score points for accurate movements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Requirements</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Webcam access</li>
                <li>Good lighting</li>
                <li>Clear view of your face</li>
              </ul>
            </section>
          </div>

          {/* Start Game Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => router.push('/game1')}
              className="relative bg-gradient-to-r from-red-700 to-orange-400 p-1 rounded-full w-48"
            >
              <div className="bg-gray-800 text-white hover:text-orange-400 transition-colors duration-200 rounded-full py-3 font-bold">
                Start Game
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 