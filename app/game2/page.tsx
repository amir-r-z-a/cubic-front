"use client";
import { useState } from "react";
import { HandDetector } from "@/components/hand_detector";

export default function Page() {
  const [poseData, setPoseData] = useState<any>(null);

  // Handle pose data updates
  const HandleHandDetected = (result: any) => {
    // setPoseData(result);
  };

  return (
    <div className="bg-dark-100 h-screen items-center">

      <div className="relative flex justify-stretch items-center ">

        <div className="text-white mt-[14%] ml-9 w-[680px]">
            <HandDetector onHandDetected={HandleHandDetected} />
        </div>

      </div>

    </div>

  );
}
