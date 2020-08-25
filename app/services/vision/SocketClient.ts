// const socketUrl = "ws://3.7.96.149:9999";
// const socketUrl = 'wss://wytboard.io/ws';
const socketUrl = 'ws://localhost:9999/';
import MainConfig from 'config/main.config';

let socket: WebSocket | null = null;

let onMessageCallBack: (event: any) => any;

let onConnectCallBack: () => void;

let onCloseCallback: () => void;

let userData: VyboUser | null = null;

const initSocketClient = (
  _cb1: (event: any) => any,
  _cb2: () => void,
  _cb3: () => void,
  _userData: VyboUser
) => {
  onMessageCallBack = _cb1;

  onConnectCallBack = _cb2;

  onCloseCallback = _cb3;

  userData = _userData;
  
  console.log('initializing socket');

  try {
    socket = new WebSocket(socketUrl);
    handlePostInitSocket();
  } catch (err) {
    console.log(err);
  }
};

const handlePostInitSocket = () => {
  console.log('initializing handlePostInitSocket', socket);
  if (socket === null) return;

  socket.onopen = function onConnectionInit() {
    onConnectCallBack();
    sendMessToSocket(JSON.stringify({ ...userData, "WEBCAM_INDEX":MainConfig.getWebcamIndex() ,type: 'USER_DETAIL' }));
    // setInterval(() => {
    //   sendMessToSocket('ping');
    // }, 80);
  };

  socket.onmessage = function onEveryMessageFromSocket(event) {
    onMessageCallBack(event);
    sendMessToSocket('ping');
  };

  socket.onclose = function onConnectionClose(event) {
    console.log('onclose event', event);
    if (onCloseCallback !== null) {
      onCloseCallback();
    }
    // event.wasClean
  };

  socket.onerror = function onConnectionError(error) {
    console.log('onerror event', error);
  };
};

const sendMessToSocket = (_msg: any) => {
  if (socket && socket.readyState === 1) {
    socket.send(_msg);
  } else {
    console.log('Socket is not connected');
  }
};

export { initSocketClient, sendMessToSocket };
