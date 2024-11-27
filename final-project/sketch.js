let imgInput, img, img2;
let newColor;
//let tileSize = 20;
let selectedColors = [];




//Shoutout to this guy for saving my code after three days of debugging: https://stackoverflow.com/questions/75402819/how-do-i-load-pixels-from-uploaded-image-file-in-p5js


function setup() {
  createCanvas(400, 400);
  selectedColors.push(color(35, 66, 91));
  selectedColors.push(color(0, 33, 19));
  selectedColors.push(color(200, 221, 221));
  selectedColors.push(color(100, 188, 100));
  selectedColors.push(color(64, 45, 30));
  selectedColors.push(color(134, 191, 227));
  selectedColors.push(color(227, 204, 134));
  selectedColors.push(color(58, 181, 89));
  selectedColors.push(color(232, 222, 176));
  selectedColors.push(color(156, 88, 28));
  
  
  //creates input box for image
  imgInput = createFileInput(handleFile);
  imgInput.position(20, 20);
  //imgInput.hide();
  
  //creates the button to start the game
  
}

function draw() {
  //if image exists, change canvas to fit and create image
  if (img) {
    let scaleRatio = windowWidth / img.width / 2;

    resizeCanvas(img.width * scaleRatio, img.height * scaleRatio * 2);
    //image(img, 0, 0, width, height);
    image(img, 0, 0, img.width  * scaleRatio, img.height  * scaleRatio);
    //img.filter(INVERT); //this will make the code strobe
    //getPrev();

    image(img2, 0, img.height * scaleRatio, img.width * scaleRatio, img.height * scaleRatio);
  } else {
    background(255);
  }
}

//determines what to do with file
function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
    let imgSrc = img.attribute("src");
    img = loadImage(imgSrc, storeImgValues);
    
    img2 = createImg(file.data, '');
    img2.hide();
    img2 = loadImage(imgSrc, handleImg2);
    //getPrev();
    //img2.filter(INVERT);

  } else {
    img = null;
    img2 = null;
  }
  imgInput.hide();
}

//all pixels are stored in lists
function storeImgValues() {
  img.resize(window.width / 2, 0);
  img.loadPixels();
  //img.filter(INVERT);
}

function handleImg2() {
  img2.loadPixels(window.width / 2, 0);
  getPrev();
  //img2.updatePixels();
  //img2.filter(INVERT);
}

//image transformation function:
function getPrev() {
  
  for (let i = 0; i < img2.pixels.length; i += 4) {
    let c = closestColor(img2.pixels[i], img2.pixels[i+1], img2.pixels[i+2]);
    //let c = color(0, 255, 0);

    img2.pixels[i] = red(c);
    img2.pixels[i+1] = green(c);
    img2.pixels[i+2] = blue(c);
    //img2.pixels[i] = 255;
    //img2.pixels[i+1] = 0;
    //img2.pixels[i+2] = 0;
  }
  img2.updatePixels();
  console.log("hey");

}

function closestColor(r, g, b) {
  //colorMode(RGB);
  
  let c = color(r, g, b);
  //colorMode(HSL);

  let closest = selectedColors[0];

  for (let i = 1; i < selectedColors.length; i++) {
    let cur = selectedColors[i];
    //if (vectorLength(hue(c) - hue(cur), saturation(c) - saturation(cur), lightness(c) - lightness(cur)) < vectorLength(hue(c) - hue(closest), saturation(c) - saturation(closest), lightness(c) - lightness(closest) )) {
      if (colorDistance(c, cur) < colorDistance(c, closest)) {
    closest = cur;
    }
  }
  //colorMode(RGB);
  return closest;
  
}

function vectorLength(x, y, z) {
  return Math.sqrt(x*x*16 + y*y + z*z);
}


let red1, red2, rmean, r1, g1, b1;
//Code adapted from https://stackoverflow.com/questions/6334311/whats-the-best-way-to-round-a-color-object-to-the-nearest-color-constant
function colorDistance(c1, c2)
{
    red1 = red(c1);
    red2 = red(c2);
    rmean = (red1 + red2) >> 1;
    r1 = red1 - red2;
    g1 = green(c1) - green(c2);
    b1 = blue(c1) - blue(c2);
    return Math.sqrt((((512+rmean)*r1*r1)>>8) + 4*g1*g1 + (((767-rmean)*b1*b1)>>8));
}


/*
function colorDistance(c1, c2)
{
    let red1 = red(c1);
    let red2 = red(c2);
    let rmean = (red1 + red2) >> 1;
    let r = red1 - red2;
    let g = green(c1) - green(c2);
    let b = blue(c1) - blue(c2);
    return Math.sqrt((((512+rmean)*r*r)>>8) + 4*g*g + (((767-rmean)*b*b)>>8));
}
*/