const video = document.getElementById('video');
const canvas = document.getElementById('overlay');

// Function to start video
function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => video.srcObject = stream)
    .catch(err => console.error(err));
}

// Function to take a snapshot and save it to Local Storage
function takeSnapshot() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const image = canvas.toDataURL('image/png');

  // Save the screenshot to Local Storage
  const screenshots = JSON.parse(localStorage.getItem('screenshots')) || [];
  screenshots.push(image);
  localStorage.setItem('screenshots', JSON.stringify(screenshots));
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

video.addEventListener('play', () => {
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
    // Clear the canvas before drawing the new results
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw detections on the canvas
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  
    // Draw the face expressions
    resizedDetections.forEach(detection => {
      const expressions = detection.expressions;
      const maxValue = Math.max(...Object.values(expressions));
      const emotion = Object.keys(expressions).filter(
        item => expressions[item] === maxValue
      );
      new faceapi.draw.DrawTextField(
        [`${emotion} : ${maxValue.toFixed(2)}`],
        detection.detection.box.bottomRight
      ).draw(canvas);
    });
  
    if (resizedDetections && resizedDetections.length > 0) {
      // Check the expressions of the first detected face
      const expressions = resizedDetections[0].expressions;
      if (expressions.happy > 0.9 || expressions.sad > 0.9) {
        takeSnapshot();
      }
    }
  }, 100);
} );
