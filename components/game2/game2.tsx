"use client";
import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import axios from "axios";

interface GameProps {
  id: string;
  poseData: any;
}

interface Score {
  id: number;
  user_id: number;
  game_type: number;
  score: number;
  created_at: string;
}

export const Game2: React.FC<GameProps> = ({ id, poseData }) => {
  const [highScore, setHighScore] = useState<number>(0);
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "build/game2/Overhead-Stretch.loader.js",
    dataUrl: "build/game2/Overhead-Stretch.data",
    frameworkUrl: "build/game2/Overhead-Stretch.framework.js",
    codeUrl: "build/game2/Overhead-Stretch.wasm",
  });

  // Add a ref to track if player data was sent
  const playerDataSent = React.useRef(false);

  // Fetch scores and calculate high score
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://localhost:8000/api/scores/my-scores', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Filter scores for game type 1 and find the highest score
        const game1Scores = response.data.scores.filter((score: Score) => score.game_type === 2);
        const maxScore = Math.max(...game1Scores.map((score: Score) => score.score), 0);
        setHighScore(maxScore);
      } catch (error) {
        console.error('Failed to fetch scores:', error);
      }
    };

    fetchScores();
  }, []);

  // Pose data updates
  useEffect(() => {
    if (poseData) {
      sendMessage("GameManager", "update_server_debug_data", JSON.stringify(poseData));
      
      // Only send player data once
      if (!playerDataSent.current) {
        const token = localStorage.getItem('token') || '';
        sendMessage("GameManager", "set_player_data", JSON.stringify({
          token: token,
          high_score: highScore
        }));
        playerDataSent.current = true;
      }
    }
  }, [poseData, highScore]);

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

