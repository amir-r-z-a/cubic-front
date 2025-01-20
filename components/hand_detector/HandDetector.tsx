"use client";

import { useEffect, useRef, useState } from 'react';
import {
  HandLandmarker,
  FilesetResolver,
  DrawingUtils
} from '@mediapipe/tasks-vision';

type RunningMode = 'IMAGE' | 'VIDEO';

type HandDetectionProps = {
  onHandDetected: (result: any) => void; // Add this prop to send the result to the parent
};


export const HandDetector: React.FC<HandDetectionProps> = ({ onHandDetected }) => {
  const [handLandmarker, sethandLandmarker] = useState<HandLandmarker | null>(null);
  const [runningMode, setRunningMode] = useState<RunningMode>('IMAGE');
  const [webcamRunning, setWebcamRunning] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enableWebcamButtonRef = useRef<HTMLButtonElement>(null);
  const disableWebcamButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const createHandLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: "GPU"
        },
        runningMode: runningMode,
        numHands: 1
      });
      sethandLandmarker(handLandmarker);
    };

    createHandLandmarker();
  }, [runningMode]);

  const enableCam = () => {
    if (!handLandmarker) {
      console.log("Wait! handLandmarker not loaded yet.");
      return;
    }
  
    setWebcamRunning(true);
    enableWebcamButtonRef.current!.style.display = 'none';
    disableWebcamButtonRef.current!.style.display = 'inline-block';
  
    const constraints = {
      video: true
    };
  
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      const video = videoRef.current!;
      video.srcObject = stream;
  
      // Ensure the video is fully loaded before starting detection
      video.addEventListener("loadeddata", () => {
        if (video.videoWidth && video.videoHeight) {
          predictWebcam();  // Start the detection when video is ready
        } else {
          console.error("Video dimensions are invalid after loadeddata event.");
        }
      });
    });
  };

  const disableCam = () => {
    const video = videoRef.current!;
    const stream = video.srcObject as MediaStream;

    // Stop all tracks to disable webcam
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    setWebcamRunning(false);
    enableWebcamButtonRef.current!.style.display = 'inline-block';
    disableWebcamButtonRef.current!.style.display = 'none';
    video.srcObject = null;

    // Clear canvas when the webcam is disabled
    const canvasElement = canvasRef.current!;
    const canvasCtx = canvasElement.getContext("2d")!;
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height); // Clear canvas
  };

  const predictWebcam = async () => {
    const video = videoRef.current!;
    const canvasElement = canvasRef.current!;
    const canvasCtx = canvasElement.getContext("2d")!;
    const drawingUtils = new DrawingUtils(canvasCtx);
  
    if (!video.videoWidth || !video.videoHeight) {
      console.error("Video is not loaded or dimensions are invalid.");
      return; // Prevent further execution if video is not ready
    }
  
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
  
    // Update canvas size to match video
    canvasElement.width = 320;
    canvasElement.height = 240;
  
    if (runningMode === 'IMAGE') {
      setRunningMode('VIDEO');
      await handLandmarker?.setOptions({ runningMode: 'VIDEO' });
    }
    let lastVideoTime = -1;
  
    const detectFrame = async () => {
      try {
        const startTimeMs = performance.now();
        if (lastVideoTime !== video.currentTime && webcamRunning) {
          lastVideoTime = video.currentTime;
  
          // Ensure the video dimensions are valid before detecting
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            const result = await handLandmarker?.detectForVideo(video, startTimeMs);
            if (result) {

              // console.log("Hand detected:", result);

              onHandDetected(result.worldLandmarks);
  
              canvasCtx.save();
              canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
              for (const landmark of result.landmarks) {
                drawingUtils.drawLandmarks(landmark, {
                  color: 'red',
                  radius: (data) =>
                    data.from?.z
                      ? DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1)
                      : 0,
                });
                drawingUtils.drawConnectors(
                  landmark,
                  HandLandmarker.HAND_CONNECTIONS,
                  {
                    color: 'blue',
                    lineWidth: 5,
                  }
                );
              }
              canvasCtx.restore();
            }
          } 
        }
  
        // Continue frame detection if webcam is running
        if (webcamRunning) {
          requestAnimationFrame(detectFrame);
        }
      } catch (error) {
        console.error("Error during hand detection:", error);
      }
    };
  
    detectFrame();
  };




  return (
    <div>
      <button
        id="webcamButton"
        ref={enableWebcamButtonRef}
        // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-20 px-20 rounded"
        onClick={enableCam}
      >
        <span className="mdc-button__ripple"></span>
        <span className="mdc-button__label ">ENABLE WEBCAM</span>
      </button>
      <button
        id="disableWebcamButton"
        ref={disableWebcamButtonRef}
        className="mdc-button mdc-button--raised"
        onClick={disableCam}
        style={{ display: 'none' }}
      >
        <span className="mdc-button__ripple"></span>
        <span className="mdc-button__label">DISABLE WEBCAM</span>
      </button>

      <div style={{}}>
        <video
          ref={videoRef}
          style={{ position: 'absolute', borderRadius: '10px' }}
          width={320}
          height={240}
          autoPlay
        ></video>
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute' }}
          width={320}
          height={240}
        ></canvas>
      </div>

    </div>
  );
};
