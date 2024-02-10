import React, { useState } from 'react'
import helpers from '../component/js/helpers';
export default function RoomCreate() {
    const [RoomName,setRoomName]=useState("");
    const [Name,setName]=useState("");
    const [RoomLink,setRoomLink]=useState("");
    const [Error,setError]=useState("");
    function createRoomButton(e){
        e.preventDefault();
        if(RoomName && Name){
            //reset error
            setError("");
            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', Name );
            //create room link
            //show message with link to room
            setRoomLink( `${ window.location.origin }?room=${ RoomName.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`); 
        }
        else{
          setError("All fields are required");
        }
    }
  return (
    <>
      <div class="container-fluid" id="room-create">
          <div class="row">
            <div class="col-12 h2 mt-5 text-center">Create Room</div>
          </div>

          <div class="row mt-2">
            {Error &&
            (<div class="col-12 text-center">
              <span class="form-text small text-danger" id="err-msg">{Error}</span>
            </div>
            )}

            <div class="col-12 col-md-4 offset-md-4 mb-3">
              <label for="room-name">Room Name</label>
              <input type="text" id="room-name" class="form-control rounded-0" placeholder="Room Name" value={RoomName} onChange={(e)=>setRoomName(e.target.value)}/>
            </div>

            <div class="col-12 col-md-4 offset-md-4 mb-3">
              <label for="your-name">Your Name</label>
              <input type="text" id="your-name" class="form-control rounded-0" placeholder="Your Name" value={Name} onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div class="col-12 col-md-4 offset-md-4 mb-3">
              <button id="create-room" class="btn btn-block rounded-0 btn-info"
               onClick={e=>createRoomButton(e)}>
                Create Room
              </button>
            </div>

            {RoomLink && 
            (<div class="col-12 col-md-4 offset-md-4 mb-3" id="room-created">
                Room successfully created. Click <a href={ RoomLink }>here</a> to enter room. 
                Share the room link with your partners.
            </div>
            )}
          </div>
        </div>
    </>
  )
}
