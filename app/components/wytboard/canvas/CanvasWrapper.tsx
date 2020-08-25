import React, { useEffect, useState } from 'react';
import VisionService from 'services/vision/VisionService';
import VyboCanvas from 'components/wytboard/canvas/VyboCanvas';
import { useAuth } from 'components/account/helpers/userAuth';

const CanvasWrapper = () => {
  const { imageStream } = VisionService;

  const [connected, setConnected] = useState(false);

  const { exec } = require('child_process');

  const { user } = useAuth();

  let intervalId: NodeJS.Timeout | null = null;

  const stopTheInterval = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
  };
  const portScanning = () => {
    exec(
      'lsof -i tcp:9999',
      (error: string, stdout: string, stderr: string) => {
        if (error) {
          console.log(`error ${error}`);
          stopTheInterval();
          intervalId = setInterval(() => portScanning(), 1000);
          return;
        }
        if (stderr) {
          console.log(`stderr ${stderr}`);
          stopTheInterval();
          intervalId = setInterval(() => portScanning(), 1000);
          return;
        }
        startStreamingVideo(stdout);
      }
    );
  };

  const portScanningWindow = () => {
    exec(
      ' netstat -ano|findstr 9999',
      (error: string, stdout: string, stderr: string) => {
        if (error) {
          console.log(`error ${error}`);
          stopTheInterval();
          intervalId = setInterval(() => portScanningWindow(), 1000);
          return;
        }
        if (stderr) {
          console.log(`stderr ${stderr}`);
          stopTheInterval();
          intervalId = setInterval(() => portScanningWindow(), 1000);
          return;
        }

        startStreamingVideo(stdout);
      }
    );
  };

  const startStreamingVideo = (stdout: string) => {
    const command = stdout.split('\n');

    if (command.length !== 1) {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }

      setConnected(true);

      VisionService.initialize(user || ({} as VyboUser));

      const $dummyVideoScreen = document.getElementById(
        'dummyVideoScreen'
      ) as HTMLVideoElement;

      imageStream.subscribe((blob) => {
        $dummyVideoScreen.src = `data:image/jpeg;base64,${blob}`;
      });
    }
  };

  useEffect(() => {
    if (process.platform === 'win32') {
      portScanningWindow();
    } else {
      portScanning();
    }
  }, []);

  return (
    <>
      {!connected && <DummyLoadingScreen />}

      <VyboCanvas />

      <div className="position-relative">
        <img
          width="320"
          height="240"
          id="dummyVideoScreen"
          className="flip_horizontal"
          alt=" "
        />
        <div id="mousepoint" />
      </div>
    </>
  );
};

export default CanvasWrapper;

const DummyLoadingScreen = () => {
  return (
    <div
      style={{
        position: 'absolute',
        margin: 'auto',
        left: '0',
        right: '0',
        width: 'fit-content',
        top: '72px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
      }}
      id="connection_alert"
      className="alert alert-primary"
      role="alert"
    >
      <div className="spinner-border mr-2" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      Connecting to vision server
    </div>
  );
};
