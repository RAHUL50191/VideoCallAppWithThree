import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import h from '../component/js/helpers';
import VideoCard from './VideoCard';

export default function App({randomNumber,setRandomNumber ,room ,username}) {
  const [socketId, setSocketId] = useState("");
  const [pc, setPc] = useState([]);
  const [myStream, setMyStream] = useState(null);
  const [screen, setScreen] = useState(null);
  const [videoState,setVideoState]=useState(false);//on-playing off-pause
  const [recordedStream, setRecordedStream] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const videoRef= useRef(null);
  const [Videos, setVideos] = useState([]);
  const socket = io("http://localhost:3001/stream", {
      autoConnect: false
    });
   socket.connect();
  useEffect(()=>{
 
    getAndSetUserStream();
    socket.on("connect", () => {
      //set socketId
      setSocketId( socket.io.engine.id);
      setRandomNumber(`__${h.generateRandomString()}__${h.generateRandomString()}__`);

      socket.emit("subscribe", {
        room: room,
        socketId: socketId,
      });

      socket.on("new user", (data) => {
        socket.emit("newUserStart", { to: data.socketId, sender: socketId });
        pc.push(data.socketId);
        init(true, data.socketId);
        console.log(data.socketId)
      });

      socket.on("newUserStart", (data) => {
        pc.push(data.sender);
        init(false, data.sender);
      });

      socket.on("ice candidates", async (data) => {
        if(data.candidate)await pc[data.sender].addIceCandidate(new RTCIceCandidate(data.candidate));
      });

      socket.on("sdp", async (data) => {
        // state == RTCSignalingState.RTCSignalingStateHaveRemoteOffer
        if (data.description.type === "offer") {
          if(data.description )
          await pc[data.sender].setRemoteDescription(new RTCSessionDescription(data.description));
            
          h.getUserFullMedia()
            .then(async (stream) => {
              if(!videoState){
              videoRef.current.srcObject=stream;
                setVideoState(true);
            }
              //save my stream
              setMyStream(stream);

              stream.getTracks().forEach((track) => {
                pc[data.sender].addTrack(track, stream);
              });

              let answer = await pc[data.sender].createAnswer();

              await pc[data.sender].setLocalDescription(answer);

              socket.emit("sdp", { description: pc[data.sender].localDescription, to: data.sender, sender: socketId });
            })
            .catch((e) => {
              console.error(e);
            });
        } else if (data.description.type === "answer") {
          if (pc.signalingState != "stable") return;
          await pc[data.sender].setRemoteDescription(new RTCSessionDescription(data.description));
        }
      });

      socket.on("chat", (data) => {
        h.addChat(data, "remote");
      });
      return ()=>{socket.off("sdp");}
    });
  },[]);
  // getAndSetUserStream, init, pc, room, setRandomNumber,  socket ,  socketId ,videoState 
  function getAndSetUserStream() {
    h.getUserFullMedia()
      .then((stream) => {
        //save my stream
        setMyStream(stream);

        if(!videoState){
          videoRef.current.srcObject=stream;
          setVideoState(true)
        }
         
      })
      .catch((e) => {
        console.error(`stream error: ${e}`);
      });
  }

  function sendMsg(msg) {
    let data = {
      room: room,
      msg: msg,
      sender: `${username} (${randomNumber})`,
    };

    //emit chat message
    socket.emit("chat", data);

    //add localchat
    h.addChat(data, "local");
  }

  function init(createOffer, partnerName) {
    pc[partnerName] = new RTCPeerConnection(h.getIceServer());

    if (screen && screen.getTracks().length) {
      screen.getTracks().forEach((track) => {
        pc[partnerName].addTrack(track, screen); //should trigger negotiationneeded event
      });
    } else if (myStream) {
      myStream.getTracks().forEach((track) => {
        pc[partnerName].addTrack(track, myStream); //should trigger negotiationneeded event
      });
    } else {
      h.getUserFullMedia()
        .then((stream) => {
          //save my stream
          setMyStream(stream);

          stream.getTracks().forEach((track) => {
            pc[partnerName].addTrack(track, stream); //should trigger negotiationneeded event
          });

         if(!videoState){
         videoRef.current.srcObject=stream;
          setVideoState(true);
        }          
          
        })
        .catch((e) => {
          console.error(`stream error: ${e}`);
        });
    }

    //create offer
    if (createOffer) {
      pc[partnerName].onnegotiationneeded = async () => {
        let offer = await pc[partnerName].createOffer();

        await pc[partnerName].setLocalDescription(offer);

        socket.emit("sdp", { description: pc[partnerName].localDescription, to: partnerName, sender: socketId });
      };
    }

    //send ice candidate to partnerNames
    pc[partnerName].onicecandidate = ({ candidate }) => {
      socket.emit("ice candidates", { candidate: candidate, to: partnerName, sender: socketId });
    };

    //add
    pc[partnerName].ontrack = (e) => {
      let str = e.streams[0];
      // if partner found then reconnect else create new stream div
        if (Videos.includes(partnerName)) {
          setVideos(Videos.filter((video,i)=>{if(video.partnerName===partnerName)return video.stream=str; return}))  
        }else {
        //videos
        setVideos([...Videos,{partnerName:`${partnerName}`,stream:str}])
 
      }
    };

    pc[partnerName].onconnectionstatechange = (d) => {
      switch (pc[partnerName].iceConnectionState) {
        case "disconnected":
        case "failed":
          setVideos(Videos.filter((video)=>{return video.partnerName!==partnerName}));
          h.closeVideo(partnerName);
          break;

        case "closed":
          setVideos(Videos.filter((video)=>{return video.partnerName!==partnerName}));
          h.closeVideo(partnerName);
          break;
          default:
      }
    };

    pc[partnerName].onsignalingstatechange = (d) => {
      switch (pc[partnerName].signalingState) {
        case "closed":
          console.log("Signalling state is 'closed'");
          setVideos(Videos.filter((video)=>{return video.partnerName!==partnerName}));
          // h.closeVideo(partnerName);
          break;
        default:
      }
    };
  }

  function shareScreen() {
    h.shareScreen()
      .then((stream) => {
        h.toggleShareIcons(true);

        //disable the video toggle btns while sharing screen. This is to ensure clicking on the btn does not interfere with the screen sharing
        //It will be enabled was user stopped sharing screen
        h.toggleVideoBtnDisabled(true);

        //save my screen stream
        setScreen(stream);

        //share the new stream with all partners
        broadcastNewTracks(stream, "video", false);

        //When the stop sharing button shown by the browser is clicked
        screen.getVideoTracks()[0].addEventListener("ended", () => {
          stopSharingScreen();
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function stopSharingScreen() {
    //enable video toggle btn
    h.toggleVideoBtnDisabled(false);

    return new Promise((res, rej) => {
      if(screen.getTracks().length )screen.getTracks().forEach((track) => track.stop());

      res();
    })
      .then(() => {
        h.toggleShareIcons(false);
        broadcastNewTracks(myStream, "video");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function broadcastNewTracks(stream, type, mirrorMode = true) {
    h.setLocalStream(stream, mirrorMode);

    let track = type === "audio" ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];

    for (let p in pc) {
      let pName = pc[p];

      if (typeof pc[pName] == "object") {
        h.replaceTrack(track, pc[pName]);
      }
    }
  }

  function toggleRecordingIcons(isRecording) {
    let e = document.getElementById("record");

    if (isRecording) {
      e.setAttribute("title", "Stop recording");
      e.children[0].classList.add("text-danger");
      e.children[0].classList.remove("text-white");
    } else {
      e.setAttribute("title", "Record");
      e.children[0].classList.add("text-white");
      e.children[0].classList.remove("text-danger");
    }
  }

  function startRecording(stream) {
    setMediaRecorder ( new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
    }))

    mediaRecorder.start(1000);
    toggleRecordingIcons(true);

    mediaRecorder.ondataavailable = function (e) {
      recordedStream.push(e.data);
    };

    mediaRecorder.onstop = function () {
      toggleRecordingIcons(false);

      h.saveRecordedStream(recordedStream, username);

      setTimeout(() => {
        setRecordedStream ([]);
      }, 3000);
    };

    mediaRecorder.onerror = function (e) {
      console.error(e);
    };
  }
  return (
      <div class="container-fluid room-comm" >
          <div class="row">
            <video ref={videoRef} class="local-video mirror-mode" id="local" autoPlay style={{zIndex:"2"}} muted volume="0"></video>
          </div>
          
          <div class="row">
            <div class="col-md-12 main" id="main-section">
              <div class="row mt-2 mb-2" id="videos">
                {Videos.map((video) => (
                  <VideoCard partnerName={video.partnerName} stream={video.stream}/>
                ))}
              </div>
            </div>

            <div class="col-md-3 chat-col d-print-none mb-2 bg-info" id="chat-pane" >
              <div class="row">
                <div class="col-12 text-center h2 mb-3">CHAT</div>
              </div>

              <div id="chat-messages"></div>

              <form>
                <div class="input-group mb-3">
                  <textarea id="chat-input" class="form-control rounded-0 chat-box border-info" rows="3" placeholder="Type here..."></textarea>
                  <div class="input-group-append" id="chat-input-btn">
                    <button type="button" class="btn btn-dark rounded-0 border-info btn-no-effect">
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  )
}
