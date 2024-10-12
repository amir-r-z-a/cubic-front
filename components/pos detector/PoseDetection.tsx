"use client";

import { useEffect, useRef, useState } from 'react';
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils
} from '@mediapipe/tasks-vision';

type RunningMode = 'IMAGE' | 'VIDEO';

type PoseDetectionProps = {
  onPoseDetected: (result: any) => void; // Add this prop to send the result to the parent
};


export const PoseDetection: React.FC<PoseDetectionProps> =  ({ onPoseDetected }) => {
  const [poseLandmarker, setPoseLandmarker] = useState<PoseLandmarker | null>(null);
  const [runningMode, setRunningMode] = useState<RunningMode>('IMAGE');
  const [webcamRunning, setWebcamRunning] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enableWebcamButtonRef = useRef<HTMLButtonElement>(null);
  const disableWebcamButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const createPoseLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `http://167.71.1.236/poselandmarker.task`,
          delegate: "GPU"
        },
        runningMode: runningMode,
        numPoses: 1
      });
      setPoseLandmarker(poseLandmarker);
    };

    createPoseLandmarker();
  }, [runningMode]);

  const enableCam = () => {
    if (!poseLandmarker) {
      console.log("Wait! poseLandmarker not loaded yet.");
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
      video.addEventListener("loadeddata", predictWebcam);
    });
  };

  const disableCam = () => {
    const video = videoRef.current!;
    const stream = video.srcObject as MediaStream;

    // Stop all tracks to disable webcam
    stream.getTracks().forEach((track) => {
      track.stop();
    });

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


    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Update canvas size to match video
    canvasElement.width = videoWidth;
    canvasElement.height = videoHeight;

    if (runningMode === 'IMAGE') {
      setRunningMode('VIDEO');
      await poseLandmarker?.setOptions({ runningMode: 'VIDEO' });
    }
    let lastVideoTime = -1;

    const detectFrame = async () => {
      const startTimeMs = performance.now();
      if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        poseLandmarker?.detectForVideo(video, startTimeMs, (result) => {
          // console.log(result.landmarks);
          onPoseDetected(result.worldLandmarks);

          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height); 
          for (const landmark of result.landmarks) {
            drawingUtils.drawLandmarks(landmark, {
              color: 'red',
              radius: (data) => data.from?.z ? DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1) : 0
            });
            drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, {
              color: 'blue',
              lineWidth: 5
            });
          }
          canvasCtx.restore();
        });
      }

      // Continue frame detection if webcam is running
      if (webcamRunning) {
        requestAnimationFrame(detectFrame);
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
          width={640}
          height={480}
          autoPlay
        ></video>
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute'}}
          width={640}
          height={480}
        ></canvas>
      </div>

    </div>
  );
};
