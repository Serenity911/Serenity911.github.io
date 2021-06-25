var constraints = { video: { facingMode: { exact: "environment" }, width: { min: 1280 },
height: { min: 720 } }, audio: false };

const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger")

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    image = cameraSensor.toDataURL("image/webp").replace("image/png", "image/octet-stream"); 
    cameraOutput.src = img;
    window.location.href=image;
    cameraOutput.classList.add("taken");
};



window.addEventListener("load", cameraStart, false);
