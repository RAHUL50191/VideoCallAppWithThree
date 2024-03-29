import React from 'react'

export default function Navbar({randomNumber}) {
  return (
    <div>
      <nav class="navbar fixed-top bg-info rounded-0 d-print-none">
        <div class="text-white">Video Call</div>
{randomNumber &&
        <div class="pull-right room-comm" hidden>
          <span class="text-white mr-5">
            Unique Identifier: <span id="randomNumber">{randomNumber}</span>
          </span>

          <button class="btn btn-sm rounded-0 btn-no-effect" id="toggle-video" title="Hide Video">
            <i class="fa fa-video text-white"></i>
          </button>

          <button class="btn btn-sm rounded-0 btn-no-effect" id="toggle-mute" title="Mute">
            <i class="fa fa-microphone-alt text-white"></i>
          </button>

          <button class="btn btn-sm rounded-0 btn-no-effect" id="share-screen" title="Share screen">
            <i class="fa fa-desktop text-white"></i>
          </button>

          <button class="btn btn-sm rounded-0 btn-no-effect" id="record" title="Record">
            <i class="fa fa-dot-circle text-white"></i>
          </button>

          <button class="btn btn-sm text-white pull-right btn-no-effect" id="toggle-chat-pane">
            <i class="fa fa-comment"></i>{" "}
            <span class="badge badge-danger very-small font-weight-lighter" id="new-chat-notification" hidden>
              New
            </span>
          </button>

          <button class="btn btn-sm rounded-0 btn-no-effect text-white">
            <a href="/" class="text-white text-decoration-none">
              <i class="fa fa-sign-out-alt text-white" title="Leave"></i>
            </a>
          </button>
        </div>
        }
      </nav>
    </div>
  )
}
