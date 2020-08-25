import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import CameraSelectionSvg from 'resources/svgs/whiteboard/CameraSelectionSvg.svg';
import NoCameraSvg from 'resources/svgs/whiteboard/NoCameraSvg.svg';
import BigNoCameraSvg from 'resources/svgs/whiteboard/BigNoCameraSvg.svg';
import Button from 'react-bootstrap/esm/Button';
import MainConfig from 'config/main.config';
import { sendMessToSocket } from 'services/vision/SocketClient';
import { useAuth } from 'components/account/helpers/userAuth';

import {
  VYBO_POPUP_BODY_STYLES,
  CAMERA_SELECTION_DROPDOWN_ITEM_STYES,
  CAMERA_SELECTION_DROPDOWN_STYLES,
  CAMERA_SELECTION_ICON_STYLES,
  VYBO_POPUP_HEADER_STYLES,
  NAVIGATION_BTN_STYLES,
  VYBO_NO_CAMERA_AVAILABLE_MSG_STYLES,
  NO_CAMERA_AVAILABLE_MSG_BOX_STYLES,
  PLEASE_CONNECT_CAMERA_MSG_STYLES,
} from './CameraSelectionStyles';

const CameraSelectionScreen = ({
  showCamera,
  finishCameraSetup,
}: {
  showCamera: boolean;
  finishCameraSetup: () => void;
}) => {
  const modalRef = React.createRef();

  const [webcams, setWebcams] = useState(null);
  const [selectedWebcam, setSelectedWebcam] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if(webcams==null){
      navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        let _devices:any = []
        devices.forEach((device)=>{
          if(device.kind==="videoinput"){
            console.log(device);
            _devices.push({
              "id":device.deviceId,
              "label":device.label
            });
          }
        });
        setWebcams(_devices);
        setSelectedWebcam(_devices[0]["label"]);
        console.log(_devices);
        startWebcam(_devices[0]["id"]);
      });
    }
  },[]);

  function selectWebcam(index){
    MainConfig.update({webcamIndex:index});
    closeCamera();
    setSelectedWebcam(webcams[index]["label"]);
    startWebcam(webcams[index]["id"]);
  }

  function startWebcam(id){
    console.log(id);
    navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({audio: false, video: { deviceId:id, width: 640, height: 480 } },
          function(stream) {
            let video = document.querySelector('video');
            video.srcObject = stream;
            video.onloadedmetadata = function(e) {
              video.play();
            };
          },
          function(err) {
            console.log("The following error occurred: " + err.name);
          }
      );
    } else {
      console.log("getUserMedia not supported");
    }
  }

  function closeCamera(){
    let video = document.querySelector('video');
    let stream = video.srcObject;

    if(stream){
      let tracks = stream.getTracks();

      tracks.forEach(function(track) {
        track.stop();
      });

      video.srcObject = null;
    }
    sendMessToSocket(JSON.stringify({...user, "WEBCAM_INDEX":MainConfig.getWebcamIndex(),type: 'USER_DETAIL' }));
    sendMessToSocket('ping');
    finishCameraSetup();
  }

  return (
    <Modal
      ref={modalRef}
      show={showCamera}
      size="lg"
      centered
      backdrop
      keyboard={false}
      id="cameraPopup"
    >
      <Modal.Body style={VYBO_POPUP_BODY_STYLES}>
        <p style={VYBO_POPUP_HEADER_STYLES}>My Preview</p>
        {
          webcams==null?<p>Loading</p>:
          <>
            <div className="d-flex">
              <div style={CAMERA_SELECTION_ICON_STYLES}>
                <img src={CameraSelectionSvg} alt="Camera Selection" />
              </div>
              <Dropdown>
                <Dropdown.Toggle style={CAMERA_SELECTION_DROPDOWN_STYLES}>
                  {selectedWebcam}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {
                    webcams.map((webcam, index)=>(
                      <Dropdown.Item key={index} onClick={()=>selectWebcam(index)} style={CAMERA_SELECTION_DROPDOWN_ITEM_STYES}>
                        {webcam.label}
                      </Dropdown.Item>
                    ))
                  }
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="d-flex align-items-center justify-content-center flex-column mb-4">
              <video
                ref={modalRef}
                width="320"
                height="240"
                className="flip_horizontal d-block my-4 mx-auto"
              ></video>
              {/* <img
                width="320"
                height="240"
                className="flip_horizontal d-block mt-4 mx-auto"
                alt=""
              /> */}
              <Button
                variant="primary"
                type="submit"
                style={NAVIGATION_BTN_STYLES}
                onClick={closeCamera}
              >
                Next
              </Button>
            </div>

            {selectedWebcam==null && <NoCameraErrorScreen />}
          </>
        }

      </Modal.Body>
    </Modal>
  );
};

export default CameraSelectionScreen;

function NoCameraErrorScreen() {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <p style={VYBO_NO_CAMERA_AVAILABLE_MSG_STYLES}>
        <img src={NoCameraSvg} alt="No Camera" className="mr-2" />
        No cameras detected. Please connect a camera to start whiteboarding.
      </p>

      <div style={NO_CAMERA_AVAILABLE_MSG_BOX_STYLES}>
        <img src={BigNoCameraSvg} alt="No Camera" className="d-block" />
        <p style={PLEASE_CONNECT_CAMERA_MSG_STYLES}>
          Connect a camera to start whiteboarding.
        </p>
      </div>
    </div>
  );
}
