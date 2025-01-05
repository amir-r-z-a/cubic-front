"use client";
import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

interface GameProps {
  id: string;
  poseData: any; // Accept pose data from parent
}

export const Game1: React.FC<GameProps> = ({ id, poseData }) => {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "build/server-test-build.loader.js",
    dataUrl: "build/server-test-build.data",
    frameworkUrl: "build/server-test-build.framework.js",
    codeUrl: "build/server-test-build.wasm",
  });

  useEffect(() => {
    if (poseData) {
      sendMessage("GameManager", "update_server_debug_data", JSON.stringify(poseData));
    }
  }, [poseData]);

  return (
    <div>
      <Unity unityProvider={unityProvider} id={id} style={{
        position: "absolute",
        width: "70%",
        borderRadius: "10px",
      }} />
    </div>
  );
};

