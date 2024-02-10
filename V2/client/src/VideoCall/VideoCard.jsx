import React, { useEffect, useRef } from 'react';

const  VideoCard = ({ partnerName, stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // if (!videoRef.current) {
    //   return;
    // }
  // if(videoRef.current)
    videoRef.current.srcObject = stream;
     
  });

  return (
    <div className="card card-sm" id={`${partnerName}-video`} style={{width:500}}>{partnerName} 
      <video ref={videoRef} className="remote-video" autoPlay/>
      <div className="remote-video-controls">
        <i className="fa fa-microphone text-white pr-3 mute-remote-mic" title="Mute"></i>
        <i className="fa fa-expand text-white expand-remote-video" title="Expand"></i>
      </div>
    </div>
  );
};

export default  VideoCard;
