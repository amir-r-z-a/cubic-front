"use client";

import React, { use, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';

type BodyPart = {
    id: string;
    title: string;
    description: string;
    position: string;
    games: {
        name: string;
        url: string;
    }[];
    comingSoon?: boolean;
};

export const BodySchema = () => {
    const [activePoint, setActivePoint] = useState<string | null>(null);

    const bodyParts: BodyPart[] = [
        {
            id: 'shoulder',
            title: 'Shoulder Games',
            description: 'Shoulder movement tracking games',
            position: 'top-[20%] left-[96%] -translate-x-1/2',
            games: [{
                name: 'Face Expression Game',
                url: '/pregame1'
            }]
        },
        {
            id: 'hand',
            title: 'Hand Games',
            description: 'Hand gesture control games',
            position: 'top-[35%] right-[-1%]',
            games: [{
                name: 'Hand Gesture Control',
                url: '/pregame2'
            }]
        },
        {
            id: 'finger',
            title: 'Finger Games',
            description: 'Finger movement tracking games',
            position: 'top-[58%] left-[106%] -translate-x-1/2',
            games: [{
                name: 'Finger Game',
                url: '/pregame3'
            }]
        },
        {
            id: 'head',
            title: 'Head Tracking',
            description: 'Head movement tracking games (Coming Soon)',
            position: 'top-[5%] left-[50%] -translate-x-1/2',
            games: [],
            comingSoon: true
        },
        {
            id: 'knee',
            title: 'Knee Exercises',
            description: 'Knee rehabilitation games (Coming Soon)',
            position: 'top-[70%] left-[50%] -translate-x-1/2',
            games: [],
            comingSoon: true
        },
        {
            id: 'foot',
            title: 'Foot Tracking',
            description: 'Foot movement tracking games (Coming Soon)',
            position: 'top-[90%] left-[50%] -translate-x-1/2',
            games: [],
            comingSoon: true
        }
    ];

    return (
        <div className="relative">
            <Image 
                src="/images/body.png" 
                width={250} 
                height={750} 
                alt="body" 
                className="relative z-0"
            />
            
            {bodyParts.map((part) => (
                <div
                    key={part.id}
                    className={`absolute ${part.position} z-10`}
                >
                    <div
                        className="relative"
                        onMouseEnter={() => setActivePoint(part.id)}
                        onMouseLeave={() => setActivePoint(null)}
                    >
                        <div className={`w-4 h-4 rounded-full cursor-pointer transform hover:scale-150 
                            transition-transform duration-200 ${
                            part.comingSoon 
                                ? 'bg-gradient-to-r from-gray-700 to-gray-500 shadow-[0_0_10px_#4b5563] hover:shadow-[0_0_15px_#4b5563]' 
                                : 'bg-gradient-to-r from-red-700 to-orange-400 shadow-[0_0_10px_#f97316] hover:shadow-[0_0_15px_#f97316]'
                        }`}>
                            <div className={`absolute -inset-1 rounded-full animate-ping opacity-20 ${
                                part.comingSoon ? 'bg-gray-500' : 'bg-orange-400'
                            }`}></div>
                        </div>

                        {activePoint === part.id && (
                            <div className="absolute left-6 -top-20 w-48 p-4 rounded-lg 
                                          bg-[rgb(53,53,53)] border border-orange-400
                                          transform transition-all duration-200 ease-out z-20
                                          shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                                <h3 className="text-white font-bold mb-2">{part.title}</h3>
                                <p className="text-gray-400 text-sm mb-3">{part.description}</p>
                                {!part.comingSoon && (
                                    <ul className="space-y-1">
                                        {part.games.map((game, index) => (
                                            <li key={index}>
                                                <Link 
                                                    href={game.url}
                                                    className="text-orange-400 text-sm hover:text-orange-300 cursor-pointer"
                                                >
                                                    • {game.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BodySchema;