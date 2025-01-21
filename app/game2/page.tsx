"use client";
import { useState } from "react";
import Game from "@/components/game2";
import PoseDetection from "@/components/pos detector";
import Image from "next/image";

export default function Page() {
  const [poseData, setPoseData] = useState<any>(null);

  // Handle pose data updates
  const handlePoseDetected = (result: any) => {
    setPoseData(result);
  };

  return (
    <div className="bg-dark-100 h-screen items-center">

      <div className="relative ">

        <div className="flex justify-between">
          <div className="text-white w-[320px] p-12">
            <PoseDetection onPoseDetected={handlePoseDetected} />
          </div>
          <h1 className="text-white mt-[10%] -mr-[25%] text-5xl">Game2</h1>
          <Image src={"/images/fig1.png"} width={700} height={100} alt="linkedin" />


        </div>
    
        <div className=" ml-[25%] mt-[1%]">
          <Game id="game" poseData={poseData} />
        </div>

      </div>

    </div>

  );
}
