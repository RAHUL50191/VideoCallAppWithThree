// import { useEffect, useState } from "react";
import "./VideoCallApp.css";
// import Robot from "./Robot";
import h from "./component/js/helpers";
import RoomCreate from "./VideoCall/RoomCreate";
import NewUser from "./VideoCall/NewUser";
import VApp from "./VideoCall/VApp";
import { useState } from "react";
import Navbar from "./VideoCall/Navbar";
function VideoCallApp() {
  const room = h.getQString(window.location.href, "room");
  const username = sessionStorage.getItem("username");
  const [randomNumber, setRandomNumber] = useState("");
  return (
    <>
      <Navbar randomNumber={randomNumber} />
      {!room && <RoomCreate />}
      {room && !username && <NewUser />}
      {room && username && <VApp randomNumber={randomNumber} setRandomNumber={setRandomNumber} room={room} username={username} />}
    </>
  );
}

export default VideoCallApp;
