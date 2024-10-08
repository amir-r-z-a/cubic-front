"use client";
import { useState } from "react";
import Game from "@/components/game1";
import PoseDetection from "@/components/pos detector";

export default function Page() {
  const [poseData, setPoseData] = useState<any>(null);

  // Handle pose data updates
  const handlePoseDetected = (result: any) => {
    setPoseData(result);
  };

  return (
    <div className="bg-dark-100 h-screen items-center">

      <div className="relative flex justify-stretch items-center ">

        <div className="text-white mt-[14%] ml-9 w-[680px]">
          <PoseDetection onPoseDetected={handlePoseDetected} />
        </div>

        <div className="mt-[12%] ml-5 ">
          <Game id="game" poseData={poseData} />
        </div>

      </div>

    </div>

  );
}
