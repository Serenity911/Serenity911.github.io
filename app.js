var constraints = { video: { facingMode: { exact: "environment" }, width: { min: 1280 },
height: { min: 720 } }, audio: false };

const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger")
    //   details = document.querySelector("#details")
    
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
    cameraOutput.src = cameraSensor.toDataURL("image/webp").replace("image/png", "image/111"); 
    cameraOutput.classList.add("taken");
    document.getElementById('details').innerText = `res: ${constraints.video.width} x ${constraints.height}; windowH: ${windowHeigth} windowW: ${windowWidth}; camera--sensor: ${cameraSensor.width}x ${cameraSensor.height}; cameraOutput: ${cameraOutput.width} x ${cameraOutput.height}`
};

windowWidth = window.innerWidth;
windowHeigth = window.innerHeight;


window.addEventListener("load", cameraStart, false);
