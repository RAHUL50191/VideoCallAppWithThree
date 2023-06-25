 import { useRef,useEffect } from "react";
 import io from "socket.io-client";
import SimplePeer from "simple-peer";
const socket = io("http://192.168.29.238:3001");  // replace with your server URL
 export default function VideoCall() {
    const videoRef = useRef();
    const peer = useRef(null);
  
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          // Display the local video stream
          videoRef.current.srcObject = stream;
  
          // Create a new peer connection
          peer.current = new SimplePeer({
            initiator: window.location.hash === '#init',
            trickle: false,
            stream: stream,
          });
  
          // When the peer receives a video stream, display it
          peer.current.on('stream', (remoteStream) => {
            const remoteVideo = document.createElement('video');
            remoteVideo.srcObject = remoteStream;
            remoteVideo.setAttribute('autoplay', 'true');
            remoteVideo.setAttribute('playsinline', 'true');
            document.body.appendChild(remoteVideo);
          });
  
          // Signal the server when the peer generates a signal
          peer.current.on('signal', (data) => {
            // Send the signal data to the other peer using your signaling mechanism
            // For example, with sockets:
            socket.emit('signal', data);
          });
  
          // When a signal is received from the other peer, handle it
        //   For example, with sockets:
          socket.on('signal', (data) => {
            peer.current.signal(data);
          });
  
          // Clean up when the component is unmounted
          return () => {
            peer.current.destroy();
          };
        })
        .catch((error) => {
          console.error('Error accessing media devices:', error);
        });
    }, []);
  
    return (
      <div>
        <video ref={videoRef} autoPlay muted></video>
      </div>
    );
  }
  