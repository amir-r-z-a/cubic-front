"use client";
import { useState } from "react";
import Image from "next/image";
import { HandDetector } from "@/components/hand_detector";
import {Game3} from "@/components/game3/game3";

export default function Page() {
  const [HandData, setHandData] = useState<any>(null);

  // Handle Hand data updates
  const HandleHandDetected = (result: any) => {
    setHandData(result);
  };

  return (
    <div className="bg-dark-100 h-screen items-center">

    <div className="relative ">

      <div className="flex justify-between">
        <div className="text-white w-[320px] p-12">
          <HandDetector onHandDetected={HandleHandDetected} />
        </div>
        <h1 className="text-white mt-[10%] -mr-[25%] text-5xl">Game3</h1>
        <Image src={"/images/fig1.png"} width={700} height={100} alt="linkedin" />


      </div>

      <div className=" ml-[25%] mt-[5%]">
        <Game3 id="game" poseData={HandData} />
      </div>

    </div>

  </div>
  );
}
