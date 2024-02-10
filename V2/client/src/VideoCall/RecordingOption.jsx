import React from 'react'

export default function RecordingOption() {
  return (
    <>
      <div class="custom-modal" id="recording-options-modal">
        <div class="custom-modal-content">
          <div class="row text-center">
            <div class="col-md-6 mb-2">
              <span class="record-option" id="record-video">
                Record video
              </span>
            </div>
            <div class="col-md-6 mb-2">
              <span class="record-option" id="record-screen">
                Record screen
              </span>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-12 text-center">
              <button class="btn btn-outline-danger" id="closeModal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
