# Doodle vision frontend

This repository contains the front end application (built in React) for Doodle Vision, which is an artificial neural network built by me to recognize 150 different types of drawings. All the categories of drawings this application can recognize are listed in: 
```
components/classes.txt
```

## How to run this app?
Downloading the app, installing the dependencies and running it will not suffice since the application needs to fetch the trained model from a server. I cannot host the files myself since these services are usually not free, however you can still run it with a little bit of setup:

- Step 1: Upload the model.json and group1-shard1of1.bin file onto an online CDN service. You can do so on a site such as www.bunny.net/cdn/ 
- Step 2: Replace the bunny.net link in the Canvas.jsx file with your new link leading to the model.json file
- Step 3: Run npm install and then npm run dev to start the project

## How does this work?
This application uses the p5.js library to create a 280x280px canvas on which the user can draw. When a user clicks on the predict button a multi-step process occurs to predict what the user has drawn. 

- Firstly, the drawing gets compressed to a 28x28 image
- Secondly, the pixels in each drawing get normalized, grayscaled inverted. This means that the brightness value of each pixel is normalized to a value between 0 and 1, and that the brightness is inverted afterwards. This is done because the model was trained on images that had white lines on top of a black background, while the application has black lines on a white background.
- Thirdly the app fetches the model from an online server, loads it and feeds it the pixels brightness values calculated in the previous step. The model will return an array of 150 probabilites.
- Finally, the program takes the array of probabilites and finds the maximum value and saves its index. It prints out the word saved in the classes.txt file with the same index.

## Where did the model come from?

The model was created by me and the code for it is in a seperate private repository. Currently that repository contains some sensitive data like private github access tokens, which is why it remains private. However, the model is saved in this repository in both .h5 and .json format and can be used by anyone. 

I can send the code for the model to anyone that requests it
