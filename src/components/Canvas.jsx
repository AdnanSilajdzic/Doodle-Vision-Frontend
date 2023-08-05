import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import p5 from 'p5';

const P5Canvas = () => {
	const canvasRef = useRef(null);
	let p5Instance;
	let classes;

	useEffect(() => {
		// get classes from classes txt file and put them in an array
		fetch('https://doodle-vision.b-cdn.net/classes.txt')
			.then((response) => response.text())
			.then((data) => {
				classes = data.split('\n');
			});
	}, []);

	// p5.js sketch function
	const sketch = (p) => {
		p.setup = () => {
			p.createCanvas(280, 280).parent(canvasRef.current);
			p.stroke(0);
			p.background(255);
			p.strokeWeight(10);
		};

		p.draw = () => {
			if (p.mouseIsPressed) {
				p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
			}
		};
	};

	// Create p5.js instance and store it in p5Instance
	p5Instance = new p5(sketch);

	// Function to clear the canvas
	const clearCanvas = () => {
		p5Instance.clear(); // Clear the p5.js canvas
		p5Instance.setup(); // Re-setup the canvas to reset the drawing area
	};

	//function to get the image data from the canvas
	const getImageData = () => {
		let inputs = [];
		let img = p5Instance.get(); // Get the image data from p5.js canvas
		img.resize(28, 28); // Resize the image to 28x28 pixels
		img.loadPixels(); // Load the pixels of the image
		for (let i = 0; i < 784; i++) {
			// Loop through all the pixels
			// Get the color of each pixel and convert it to grayscale
			// Add the pixel color to the inputs array
			let bright = img.pixels[i * 4];
			inputs[i] = (255 - bright) / 255.0;
		}
		makePrediction(inputs);
	};

	const makePrediction = async (inputs) => {
		// load the model
		const model = await loadModel();
		const tensorInputs = tf.tensor(inputs, [1, 28, 28, 1]);
		// make a prediction
		const prediction = await model.predict(tensorInputs);
		const results = await prediction.data();
		const index = results.indexOf(Math.max(...results));
		console.log(classes[index]);
	};

	async function loadModel() {
		const model = await tf.loadLayersModel(
			'https://doodle-vision.b-cdn.net/model.json'
		);

		return model;
	}

	return (
		<div>
			<div ref={canvasRef}></div>
			<div className="flex w-[280px] justify-between">
				<button
					className="mt-5 border bg-gray-300 px-5 py-3"
					onClick={clearCanvas}
				>
					Clear
				</button>
				<button
					className="mt-5 border bg-gray-300 px-5 py-3"
					onClick={getImageData}
				>
					Guess
				</button>
			</div>
		</div>
	);
};

export default P5Canvas;
