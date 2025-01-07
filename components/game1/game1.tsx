"use client";
import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import axios from "axios";

interface GameProps {
  id: string;
  poseData: any;
}

interface UserGameData {
  token: string;
  high_score: number;
}

export const Game1: React.FC<GameProps> = ({ id, poseData }) => {
  const [userDataSent, setUserDataSent] = useState(false);
  
  const { unityProvider, sendMessage, isLoaded } = useUnityContext({
    loaderUrl: "build/server-test-build.loader.js",
    dataUrl: "build/server-test-build.data",
    frameworkUrl: "build/server-test-build.framework.js",
    codeUrl: "build/server-test-build.wasm",
  });

  // Send user data when Unity is loaded
  useEffect(() => {
    const sendUserData = async () => {
      if (isLoaded && !userDataSent) {
        try {
          // Get token from localStorage
          const token = localStorage.getItem('token');
          
          // Fetch high score from API
          const response = await axios.get('http://localhost:8000/api/scores/my-scores', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          // Find highest score for game type 1
          const highScore = response.data.scores
            .filter((score: any) => score.game_type === 1)
            .reduce((max: number, score: any) => Math.max(max, score.score), 0);

          // const userData: UserGameData = {
          //   token: token || "",
          //   high_score: highScore
          // };

          const userData: UserGameData = {
            token: "jashsjkdahfkjfkladjf;a",
            high_score: 212
          };

          // Send user data to Unity
          sendMessage("GameManager", "set_player_data", JSON.stringify(userData));
          setUserDataSent(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    sendUserData();
  }, [isLoaded, sendMessage, userDataSent]);

  // Send pose data only after user data has been sent
  useEffect(() => {
    if (poseData && userDataSent) {
      sendMessage("GameManager", "update_server_debug_data", JSON.stringify(poseData));
    }
  }, [poseData, sendMessage, userDataSent]);

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

