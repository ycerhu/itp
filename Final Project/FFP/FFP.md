# [LMSC-261: Final Project] 
# Concert Visuals for 'Lichtbogen' with p5.js 


## Introduction
This report aims to provide a detail documentation of the creation process of my final project "Concert Visuals for 'Lichtbogen" with p5.js". Before stepping into the process, I will first recap on the initial project description as well as targeted outcomes stated in the proeject proposal. The focus of the project changed after the exploration and research stage during the first 2 weeks. Then, I will dive into explaning my codes and describing how I encountered and learnt new functions. 

Please skip to subtitle: 'Week 4 onward' if you want to look at the programming.

## Recap: Initial Project Overview 
For my final project, I am planning to create an interactive concert visuals for my artistic direction passion project 'Lichtbogen'(description below) on p5.js and P5LIVE. Interested in pursuing a career in creative direction creaitng multimedia concerts, I want to preparing myself the required empathy and professionalism in communication with art collaborators as well as experiencing the creative process of visual media programming to make more techincal comments supporting my aesthetics pursuit in the future. The final project will be creating visuals for an original music I made with my friends, Daven, back in 2025 Summer. (Audio Reference: [Untitled, Daven Dubois](https://ycerhu.github.io/)) In my imagination for the music, I am aiming to include elements including 'whale', 'water movement', 'rising bubbles', 'chinese ink', and 'star night'. My job for the project will be creating the objects representing these elements and try to animate them, or even creating a cursor-controlled/audio reactive interactive protocal, and develop it to motion-captured in the future.

## Recap: Initial Targeted Outcomes 
##### GOOD: 
Creating animated looping/randomized visuals for 'Untitled, Daven Dubois' on p5.js: containing elements 'whale', 'water movement', rising bubbles'; and textures ' chinese ink' and 'start night'
##### BETTER: 
Creating cursor-controlled interactive visuals for 'Untitled, Daven Dubois' on p5.js and P5LIVE: containing elements 'whale', 'water movement', rising bubbles'; and textures ' chinese ink' and 'start night'
##### BEST: 
Creating audio-reactive visuals for 'Untitled, Daven Dubois' on p5.js and P5LIVE: containing elements 'whale', 'water movement', rising bubbles'; and textures ' chinese ink' and 'start night'. Outcome should be aesthetically consistent and pleasing according to the 'Litchbogen' moodboard (Moodboard: [Project website](https://ycerhu.github.io/))

## Week 1-2: Exploration and Research 
During these two weeks, I focused on brainstorming the different tools and visual elements I can use to represent the selected music. As mentioned, I wanted to include elements like 'whale', 'water movement', 'rising bubbles'a and 'chinese ink'. I began looking through professional examples of p5.js artworks posted on the official website as well as some p5.js user YouTube channels and explored the following tools through codealong:

1. [Strings-art by Patt Vira](https://youtu.be/qH7ZgQghKUU?si=GGHGhibbohgFtso)

2. [Oscillating Wave Pattern by Patt Vira](https://youtu.be/MpDUW_bvihE?si=haChINbfCb8Zts7f)

3. [Perlin Noise Flow Field by Patt Vira](https://youtu.be/KOgRn2Brcdo?si=5W1TpA1p16H8mnWk)

Besides, I also explored some great tools like:

1. [p5.brush by MIT](https://github.com/acamposuribe/p5.brush)

2. [Noisy Circle by Alex Postolache) Circle](https://alexcodesart.com/drawing-noisy-circles-with-p5-js-a-deep-dive-into-polar-coordinates-and-perlin-noise/)

3. [p5.sound](https://www.youtube.com/watch?v=Pn1g1wjxl_0&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW)

Besides, I also watched videos to learn about p5.live. However, I found that it is mainly for cooperative coding for groups of people which is not very helpful in this project. 

## Week 3: Meeting with Professor Rachel Rome + Refine Project Goal
After class ended, I met with Professor Rachel Rome to discuss the project development. I shared my codealongs and the finding that p5.live is not useful for this project. As a result, we first eliminate p5.live as a part of the project component. Then, I mentioned I would like to have the visuals be audio-reactive instead of cursor-reactive because I hope to use it as a (live)music performance visual background. Rachel provided some directions including: p5.sound, FFT, mapping amplitude to object variables. From then, I changed the plan to:

Creating an audio-reactive animation that changes according to the imported audio file. 

Moreover, after the exploration in the previous weeks, I decided to narrow down the tools I will try to use.

I will focus on using: 1) Perlin Noise Flow Field -- foam, audio-reactive; 2) Noisy Circle -- waves, audio reactive; 3) p5.sound -- for loading music.

I rejected the idea of using p5.brush despite its beautiful design as it is more suitable for still image or low fps artwork which doesn't suit the high sample rate audio reactive project. Also the brush is basically hectagon and rectangle images which don't offer the desired flowy texture.

## Week 4 onward: Project

Although in reality, I made compromises, in terms of the level of complexity, in response to failure to debug, time constraint, and aesthetic purposes, let's not continue to describe the working process in chronological order like a fiction. 

Instead, I will talk about the project according to the different components in following order: 

1. p5.sound: loading audio file and image file
2. FFT + Perlin noise Flow Field 
3. FFT + Noisy Circles 

### p5.sound: loading audio file

`function preload() {
	bgImg = loadImage('whale 2.jpg');
	bgSound = loadSound('DavenYu.mp3');
}`

Instead of `function setup()`, I first created a `function preload()` to prevent delay in the appearance of media file I imported. I learnt from [Strings-art by Patt Vira](https://youtu.be/qH7ZgQghKUU?si=GGHGhibbohgFtso) and [p5.sound](https://www.youtube.com/watch?v=Pn1g1wjxl_0&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW) that it requires time for the program to load media file if it is placed in `function setup()`. However `function preload()` can serve like a pre-set-up so that they will be loaded already and ready to launch once the program is launched.


#### Summary for the next two points:

I use the FFT function to retrieve data of the 'energy', aka volume, of 3 frequency band: bass, mid, treble. Why not high/mid/low? Because they are predefined name of the getEnergy() function. 

Bass volume is affecting acceleration of the particles. 

Mid volume is affecting the distortion of the noisy circle. 

Treble volume is affecting the shadowBlur on the circles + 


### FFT + Perlin Noise Flow Field

Step 1: Create an array `particles` where each particle is spawn at a random x,y location

`for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(random(width), random(height)));
}`



