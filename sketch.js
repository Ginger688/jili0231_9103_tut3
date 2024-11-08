// jili0231_assignment_major_project
// Name: Jinjie Li
// Unikey: jili0231
// SID: 540929232
// USYD CODE CITATION ACKNOELEDGEMENT

// Initial set
// Set an image
let img;
// Make a variable to hold the audio file
let song;
// Make a variable to hold the FFT object
let fft;
// Make a variable to hold the sound amplitude
let sound_amplitude
// Array to store multiple waves
// Make a global variable for the button so we can access it in the windowResized function
let button;

// Set waves
let waves = [];
// Set lines
let lines;

// Number of waves to create
let numWaves = 20;
// Make a variable for the number of bins in the FFT object
let numBins = 128;
// Make a variable for the smoothing of the FFT
let smoothing = 0.8;

function preload() {
  img = loadImage('Assets/Edvard_Munch_The_Scream.jpeg'); 
  song = loadSound('Assets/Kate Bush - Running Up That Hill(A Deal With God) (2018 Remaster).wav');
}

class Line{
  constructor(spacing, strokeWeight, amplitude) {
    // The space of the lines
    this.spacing = spacing; 
    // Thickness of the line
    this.strokeWeight = strokeWeight; 
    // The amplitude of the sound
    this.amplitude=amplitude;
  }

  // Method to display the lines
  display(){
      // Access image pixels
      let segmentLength = 50;
      for (let y = 0; y < height; y += this.spacing) {
          for (let x = 0; x < width; x += this.spacing) {
              // Pixel array index
              let index = (x + y * img.width) * 4;
              let r = img.pixels[index];
              let g = img.pixels[index + 1];
              let b = img.pixels[index + 2];

              // Determine angle based on brightness or color properties
              //let change_angle=map(this.amplitude,0,255,-PI / 4, PI / 4);
              let angle = map(r + g + b, 0, 255 * 3, 0, -PI / 4, PI / 4);
              //let angle = map(this.amplitude, 0, 255, 0, change_angle);
              
              // Set the color from the image pixel
              stroke(r, g, b);
              strokeWeight(this.strokeWeight);
              
              // Calculate the start and end points for the line segment
              let x1 = x - segmentLength * cos(angle) / 2;
              let y1 = y - segmentLength * sin(angle) / 2;
              let x2 = x + segmentLength * cos(angle) / 2;
              let y2 = y + segmentLength * sin(angle) / 2;
              // Draw the line segment
              let change_scope=map(this.amplitude,0,255,0,width*0.2);
              line(x1+10*noise(this.amplitude), y1+change_scope, x2+10*noise(this.amplitude), y2+change_scope); 


          }
      }
  }
}


// This is a background wave class, it will draw a lot of wave lines across the screen
class Wave {
    // Constructor with parameters for amplitude, frequency, yBase, color, and strokeWeight
    // The amplitude is the height of the wave
    // The frequency is how often peaks and troughs occur - how far we move across the noise function for each point of the wave
    // The yBase is the y position of the wave
    // The color is the color of the wave.
    // The strokeWeight is the thickness of the wave line.
    constructor(amplitude, frequency, yBase, strokeWeight) {
        // Height of the wave
        this.amplitude = amplitude;
        // How often peaks and troughs occur
        this.frequency = frequency; 
        // Base line of the wave
        this.yBase = yBase; 
        // Thickness of the wave line
        this.strokeWeight = strokeWeight; 
        // Initial offset for Perlin noise
        this.offset=0;
    }
  
    // Method to display the wave
    display() {
      noFill();
      // Set the stroke weight (different for each class instance)
      strokeWeight(this.strokeWeight);
      // Begin the shape
      beginShape();
      // Using a fixed xoff offset, the wave is kept stationary
      let xoff = this.offset; 
      // Now we move across the screen, left to right in steps of 10 pixels
      for (let x = 0; x <= width; x += 10) {
        let waveHeight = map(noise(xoff), 0, 1, -this.amplitude, this.amplitude);
        // Gets the color from the (x, y) coordinates of the image
        let col = img.get(x, this.yBase);
        // Set the color to the sampled color
        stroke(col); 
        // We draw a vertex at the x position and the yBase position + the wave height
        vertex(x, this.yBase + waveHeight);
        // We are still inside the for loop, so we increment xoff by the frequency
        // Increasing xoff here means the next wave point will be sampled from a different part of the noise function
        xoff += this.frequency;
      }
      // Now we reached the edge of the screen we end the shape
      endShape();
      // Now we increment the class instances offset, ready for the next frame
      this.offset += 0.005;
    }
  }

// Define the ScreamingDog class
class Screaming {
    constructor(x, y, size,amplitude) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.amplitude=amplitude;
    }
  
    // Method to display the dog
    display() {
        push();
        translate(this.x+5*noise(this.amplitude), this.y+5*noise(this.amplitude));
        //rotate(20/180*Math.PI);
        noStroke();
        // The coordinates of the vertices of the triangle draw the ears
        //fill(148, 140, 130);
        //triangle(-this.size *0.6, -this.size * 0.5, -this.size * 0.25 , -this.size * 0.5, -this.size * 0.5, -this.size * 0.1);
        //triangle(this.size *0.75, -this.size * 0.35, this.size * 0.35 , -this.size * 0.35, this.size * 0.4, this.size * 0.1);
        
        //body
        fill(148, 140, 130);
        // Head
        fill(194, 180, 139);
        beginShape();
        curveVertex(0,-0.5*this.size);
        curveVertex(0,-0.5*this.size);
        curveVertex(-0.25*this.size,-0.45*this.size);
        curveVertex(-0.45*this.size,0);
        curveVertex(0,0.5*this.size);
        curveVertex(0.45*this.size,0);
        curveVertex(0.25*this.size,-0.45*this.size);
        curveVertex(0,-0.5*this.size);
        curveVertex(0,-0.5*this.size);
        endShape();
        //ellipse(0,0,this.size,this.size*1.1);
        // Eyes
        fill(189, 161, 106);
        stroke(141, 136, 79);
        // Left eye and right eye
        ellipse(-this.size * 0.2, -this.size * 0.2, this.size * 0.2, this.size * 0.2); 
        ellipse(this.size * 0.2, -this.size * 0.2, this.size * 0.2, this.size * 0.2); 
    
        // Mouth
        fill(141, 136, 79);
        stroke(136, 93, 43);
        let mouth_height=map(this.amplitude,0,255,0,this.size * 0.3);
        ellipse(0, this.size * 0.15, this.size * 0.16, mouth_height); 

        // Cloth
        fill(57, 50, 45);
        beginShape();
        curveVertex(0,0.7*this.size);
        curveVertex(0,0.7*this.size);
        curveVertex(-0.3*this.size,0.2*this.size);
        curveVertex(-0.7*this.size,0.7*this.size);
        curveVertex(-0.8*this.size,1.2*this.size);
        curveVertex(-1.2*this.size,2*this.size);
        curveVertex(-2*this.size,2.5*this.size);
        curveVertex(-2*this.size,3*this.size);
        curveVertex(2*this.size,3*this.size);
        curveVertex(1.2*this.size,2.5*this.size);
        curveVertex(0.8*this.size,1.2*this.size);
        curveVertex(0.7*this.size,0.7*this.size);
        curveVertex(0.3*this.size,0.2*this.size);
        curveVertex(0,0.7*this.size);
        curveVertex(0,0.7*this.size);
        endShape();

        // Hand
        fill(194, 180, 139);
        stroke(136, 93, 43);
        // Left hand
        beginShape();
        curveVertex(-0.4*this.size,-0.4*this.size);
        curveVertex(-0.4*this.size,-0.4*this.size);
        curveVertex(-0.55*this.size,0);
        curveVertex(-0.4*this.size,0.5*this.size);
        curveVertex(-0.3*this.size,1*this.size);
        curveVertex(-0.25*this.size,0.5*this.size);
        curveVertex(-0.38*this.size,-0.2*this.size);
        curveVertex(-0.4*this.size,-0.4*this.size);
        curveVertex(-0.4*this.size,-0.4*this.size);
        endShape();

        // Right hand
        beginShape();
        curveVertex(0.4*this.size,-0.4*this.size);
        curveVertex(0.4*this.size,-0.4*this.size);
        curveVertex(0.55*this.size,0);
        curveVertex(0.4*this.size,0.5*this.size);
        curveVertex(0.3*this.size,1*this.size);
        curveVertex(0.25*this.size,0.5*this.size);
        curveVertex(0.38*this.size,-0.2*this.size);
        curveVertex(0.4*this.size,-0.4*this.size);
        curveVertex(0.4*this.size,-0.4*this.size);
        endShape();
        pop();
    
    }
    back(){
        push();
        translate(this.x, this.y);
        noStroke();
        fill(57, 50, 45);
        //body
        ellipse(0,1.2*this.size,0.8*this.size,2*this.size);
        // Head
        ellipse(0,0,0.5*this.size,0.5*this.size);
        // Legs
        stroke(57, 50, 45);
        strokeWeight(10);
        line(-0.15*this.size,2*this.size,-0.15*this.size,2.8*this.size); 
        line(0.15*this.size,2*this.size,0.15*this.size,2.8*this.size);
        pop();
    }

  }

  class Boat {
    constructor(x, y, size,amplitude) {
        // x position of the boat
        this.x = x;      
        // y position of the boat
        this.y = y;      
        // Overall size of the boat
        this.size = size; 
        // The moving of the boat
        this.amplitude=amplitude;
    }
  
    display() {
      // Set color for boat hull and outline color
      // Brown color for the boat hull
      push();
      translate(this.x+noise(this.amplitude),this.y+noise(this.amplitude));
      fill(139, 69, 19); 
      // Black outline
      stroke(0);  
      strokeWeight(1);      
      // Boat hull: Use an ellipse shape
      ellipse(0, 0, this.size * 2, this.size / 2);
      // Mast: Use a thin rectangle for the mast
      // Black mast color
      fill(0); 
      // Mast
      rect(0, - this.size, this.size / 10, this.size); 
      // Sail: Use a triangle shape to represent the sail
      // White color for the sail
      fill(144, 203, 251); 
      noStroke();
      triangle(0, -this.size, 0, -this.size / 2, -this.size / 1.5, -this.size / 2);
      // Add a slight outline effect for the bottom of the boat
      stroke(0);
      strokeWeight(1);
      noFill();
      // Half-circle outline
      arc(0, 0, this.size * 2, this.size / 1.8, 0, PI);
      pop();
    }
  }


  function setup() {
    // Create the canvas filling the window
    createCanvas(windowWidth, windowHeight);
    // Resize the image to the canvas size
    img.resize(windowWidth, windowHeight);
    // Create a new instance of p5.FFT() object
    fft = new p5.FFT(smoothing, numBins);
    song.connect(fft);
    // Load pixel data for color sampling;
    img.loadPixels();
    // Add a button for play/pause
    // We cannot play sound automatically in p5.js, so we need to add a button to start the sound
    button = createButton("Play/Pause");
    // Set the position of the button to the bottom centre
    button.position((width - button.width) / 2, height - button.height - 2);
    // We set the action of the button by choosing what action and then a function to run
    // In this case, we want to run the function play_pause when the button is pressed
    button.mousePressed(play_pause);
    // Create lines
    lines=new Line(10,5,20);
    createWaves(height / 8);
  }
  
  function draw() {
    // Set the background color to an ocean blue
    background(0);
    // Update fft data
    fft.analyze();
    sound_amplitude = fft.getEnergy(20,500);
    //console.log(sound_amplitude);
    let wave_amplitude=map(sound_amplitude,0,255,0,height/8);
    // Test for the animation
    //let wave_amplitude=height/8;
    // Create the waves
    createWaves(wave_amplitude);
    // Update the amplitude value of the lines object
    lines.amplitude = sound_amplitude;
    // Draw lines
    lines.display();
    for (let i = 0; i < waves.length; i++) {
      // Update all waves
      waves[i].display();
    }

    // Create an instance of ScreamingDog, centered on canvas
    let screaming1 = new Screaming(width*0.47, height*0.54, width*0.15,sound_amplitude);
    let screaming2 = new Screaming(width*0.03, height*0.4, width*0.08,sound_amplitude);
    let screaming3 = new Screaming(width*0.1, height*0.4, width*0.08,sound_amplitude);
    // Create the instance of the Boat
    let Boat1 = new Boat(width*0.3, height*0.35, width*0.03,sound_amplitude);
    let Boat2 = new Boat(width*0.4, height*0.38, width*0.03,sound_amplitude);
    
    // Display the bridge
    createBridge();
    // Display the screaming dog
    screaming1.display();
    screaming2.back();
    screaming3.back();
    Boat1.display();
    Boat2.display();
  }

  // Play the song or pause the song
  function play_pause() {
    if (song.isPlaying()) {
      song.stop();
    } else {
      // We can use song.play() here if we want the song to play once
      // In this case, we want the song to loop, so we call song.loop()
      song.loop();
    }
  }
  
  function createWaves(sound_amplitude){
    // Clear the waves array
    waves = [];
    // Create multiple waves with varying properties
    for (let i = 0; i < numWaves; i++) {
        // We are moving down the screen as we set the yBase for each new wave
        // The wave is in the top half of the image
        let yBase = i * height *0.28/ (numWaves);
        // As we move down the screen i gets bigger and so does the amplitude
        amplitude = i*sound_amplitude/numWaves; 
        // As we move down the screen the waves get heavier by increasing the stroke weight
        let strokeW = 10; 
        waves.push(new Wave(amplitude, random(0.01, 0.02), yBase, strokeW));
    }
  }

  function createBridge(){
    // The filling of the railing
    fill(199, 167, 98);
    strokeWeight(2);
    // The first railing
    beginShape();
    vertex(0,height*0.38);
    vertex(width,height*0.85);
    vertex(width,height*0.92);
    vertex(0,height*0.385);
    endShape();
    // The second railing
    beginShape();
    vertex(width*0.1,height*0.45);
    vertex(width*0.96,height);
    vertex(width*0.8,height);
    vertex(width*0.1,height*0.455);
    endShape();
    // The middle avenue
    fill(136, 93, 43);
    stroke(135, 64, 45);
    strokeWeight(6);
    beginShape();
    vertex(0,height*0.39);
    vertex(width*0.1,height*0.47);
    vertex(width*0.73,height);
    vertex(0,height);
    endShape();
    
    // The border of the railing
    stroke(140, 103, 62);
    strokeWeight(4);
    //  The first railing
    line(width*0.3,height*0.53,width,height*0.86);
    line(width*0.55,height*0.66,width,height*0.9);
    // The second railing
    line(width*0.35,height*0.62,width*0.9,height);
    line(width*0.68,height*0.88,width*0.85,height);
    // The fence on a railing
    noStroke();
    fill(71, 60, 42);
    rect(width*0.22,height*0.5,width*0.015,height*0.08);
    rect(width*0.35,height*0.56,width*0.017,height*0.13);
    rect(width*0.6,height*0.7,width*0.03,height*0.2);
    rect(width*0.83,height*0.82,height*0.045,height*0.2);

    // The middle avenue
    stroke(216, 106, 51);
    strokeWeight(10);
    for (let y = height*0.56; y < height; y += 10) {
        for (let x = 0; x < width*0.2; x += 10) {
            // Determine angle based on brightness or color properties
            let angle =  (y)*Math.PI / (2*height);
            // Set the color from the image pixel
            stroke(249, 208, 92+x);
            strokeWeight(4);
            // The start and end points for the line segment
            // Draw the line segment
            //line(x, y, x + 100 * cos(angle) / 2, y + 100 * sin(angle) / 2); 
        }
    }
  }
  

  function windowResized() {
    // Resize the canvas when the window is resized. This will update the width and height variables 
    // that are used to calculate the size and position of the shapes.
    resizeCanvas(windowWidth, windowHeight);
    // Resize the image to the canvas size
    img.resize(windowWidth, windowHeight);
    // Reset the position of the button
    button.position((width - button.width) / 2, height - button.height - 2);
    // Recreate waves with updated dimensions
    createWaves();
  }

  

