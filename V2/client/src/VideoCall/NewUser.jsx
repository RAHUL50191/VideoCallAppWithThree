import React, { useState } from 'react'

export default function NewUser() {
  const [Name,setName]=useState("");
  const [Error,setError]=useState("");
  function enterButton(e){
  e.preventDefault();
        if ( Name ) {
            //remove error message, if any
            setError("");

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', Name );

            //reload room
            window.location.reload();
            
        }else{
          setError("Please input your name");
        }        
    };
  return (
    <>
      <div class="container-fluid" id="username-set" >
          <div class="row">
            <div class="col-12 h4 mt-5 text-center">Your Name</div>
          </div>

          <div class="row mt-2">
            {Error && 
            (<div class="col-12 text-center">
              <span class="form-text small text-danger" id="err-msg-username">{Error}</span>
            </div>
            )}

            <div class="col-12 col-md-4 offset-md-4 mb-3">
              <label for="username">Your Name</label>
              <input type="text" id="username" class="form-control rounded-0" placeholder="Your Name"  value={Name} onChange={e=>setName(e.target.value)}/>
            </div>

            <div class="col-12 col-md-4 offset-md-4 mb-3">
              <button id="enter-room" class="btn btn-block rounded-0 btn-info" onClick={e=>enterButton(e)}>
                Enter Room
              </button>
            </div>
          </div>
        </div>
    </>
  )
}
