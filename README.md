# Face Detection Web App

This project is designed to help you learn how to build a real-time face detection and expression recognition application using `face-api.js`. You will complete a series of tasks to achieve a fully functional application by the end of this lesson.

## Getting Started

Begin by cloning this repository or downloading the provided starter files to your local machine.

### Prerequisites

- A modern web browser
- A live server connection can also use extensions for this
- A extension with code with me to live code pair
- A webcam connected to your computer.

### Installation

No additional installation is required for this project, as all necessary libraries are provided.

## Project Structure

```plaintext
face-detection-app/
│
├── index.html                  # The main HTML file.
├── script.js                   # The JavaScript file you will work on.
└── models/                     # Directory containing face-api.js models.
    ├── tiny_face_detector_model-weights_manifest.json
    ├── face_landmark_68_model-weights_manifest.json
    ├── face_landmark_68_tiny_model-weights_manifest.json
    ├── face_expression_model-weights_manifest.json
    └── face_recognition_model-weights_manifest.json
```

## Tasks

Your goal is to complete the following tasks within the `script.js` file:

### Task 1: Load the Models

Uncomment and complete the code required to load the `face-api.js` models. The models should be loaded asynchronously before the webcam stream starts.

### Task 2: Access the Webcam

Implement the functionality to access the webcam stream using the `navigator.mediaDevices.getUserMedia` API. Ensure the video from the webcam is displayed in the `video` element on the webpage.

### Task 3: Implement Face Detection

Set up an interval or a loop to continuously detect faces from the webcam stream using the loaded models. You will need to use the `detectAllFaces` method from `face-api.js`.

### Task 4: Draw the Results

After detecting faces and their expressions, draw the results on a canvas that overlays the video. You'll use the `faceapi.createCanvasFromMedia` method and other drawing utilities provided by `face-api.js`.

## Bonus Challenges

If you complete the main tasks early, try these bonus challenges:

- **Challenge 1**: Implement a button to take a snapshot of the video when a certain expression (like a smile) is detected.
- **Challenge 2**: Experiment with different models and configurations to improve performance.

## Resources

- [face-api.js GitHub Repository](https://github.com/justadudewhohacks/face-api.js) - Official `face-api.js` documentation and examples.
- [MediaDevices.getUserMedia() - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) - Documentation on accessing camera and microphone streams in the browser.

