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
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    cameraView.videoHeight = windowHeight;
    cameraView.videoWidth = windowWidth;
    cameraSensor.width = windowWidth;
    cameraSensor.height = windowHeight;
    cameraOutput.videoHeight = windowHeight;
    cameraOutput.videoWidth = windowWidth;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0, windowWidth, windowHeight);
    cameraOutput.src = cameraSensor.toDataURL("image/webp").replace("image/png", "image/111"); 
    cameraOutput.classList.add("taken");
    document.getElementById('details').innerText = `res: ${constraints.video.width.min} x ${constraints.video.height.min}; 
    windowH: ${windowHeight} windowW: ${windowWidth}; camera--sensor: ${cameraSensor.width}x ${cameraSensor.height}; 
    cameraOutput: ${cameraOutput.width} x ${cameraOutput.height}`
};
// body = document.getElementsByTagName("body")[0]
// windowWidth = window.innerWidth;
// windowHeigth = window.innerHeigth;


window.addEventListener("load", cameraStart, false);
