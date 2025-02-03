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
          <h1 className="text-5xl text-white font-bold mb-4">Thumb Exercise Game</h1>
          <p className="text-orange-400 text-xl">Enhance your thumb mobility and strength</p>
        </div>

        {/* Main Content */}
        <div className="bg-[rgb(53,53,53)] rounded-lg p-8 shadow-lg">
          {/* Game Preview Image */}
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image 
              src="/images/finger.gif"
              fill
              style={{ objectFit: 'contain' }}
              alt="Thumb Exercise Preview"
              className="rounded-lg"
              priority
            />
          </div>

          {/* Game Description */}
          <div className="text-white space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-3">About the Game</h2>
              <p className="text-gray-300 leading-relaxed">
                The Thumb Exercise Game is designed to improve thumb flexibility and strength through 
                engaging movements. This exercise is particularly beneficial for those who experience 
                thumb stiffness from repetitive motions, such as typing or gaming. Regular practice 
                can help prevent thumb-related conditions and improve your daily hand functions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">How to Play</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Position your hand in front of the camera</li>
                <li>Follow the on-screen thumb movement patterns</li>
                <li>Perform circular and stretching motions as guided</li>
                <li>Maintain consistent speed and proper form</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Requirements</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Webcam access for hand tracking</li>
                <li>Well-lit environment for better tracking</li>
                <li>Clear view of your hand</li>
                <li>Space for comfortable hand movements</li>
              </ul>
            </section>
          </div>

          {/* Start Game Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => router.push('/game3')}
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