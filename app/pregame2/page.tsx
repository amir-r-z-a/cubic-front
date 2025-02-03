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
          <h1 className="text-5xl text-white font-bold mb-4">Overhead Stretch Game</h1>
          <p className="text-orange-400 text-xl">Improve your shoulder flexibility and range of motion</p>
        </div>

        {/* Main Content */}
        <div className="bg-[rgb(53,53,53)] rounded-lg p-8 shadow-lg">
          {/* Game Preview Image */}
          <div className="relative h-[320px] mb-8 rounded-lg overflow-hidden">
            <Image 
              src="/images/overhead.gif"
              fill
              style={{ objectFit: 'cover' }}
              alt="Overhead Stretch Exercise Preview"
              className="rounded-lg"
            />
          </div>

          {/* Game Description */}
          <div className="text-white space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-3">About the Game</h2>
              <p className="text-gray-300 leading-relaxed">
                The Overhead Stretch Game focuses on improving your shoulder mobility and overhead range of motion. 
                This exercise helps release tension in your shoulders and upper back while strengthening your 
                shoulder muscles. Perfect for those who spend long hours at a desk or want to improve their 
                overhead movements for sports and daily activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">How to Play</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Stand facing the camera with feet shoulder-width apart</li>
                <li>Raise your arms overhead following the on-screen guide</li>
                <li>Hold the stretch positions as indicated</li>
                <li>Maintain proper form while reaching maximum range</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Requirements</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Webcam access for movement tracking</li>
                <li>Clear space around you (especially overhead)</li>
                <li>Wear fitted clothing for accurate tracking</li>
                <li>Ensure good lighting conditions</li>
              </ul>
            </section>
          </div>

          {/* Start Game Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => router.push('/game2')}
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