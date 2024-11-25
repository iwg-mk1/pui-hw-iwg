let imgInput, img, img2;
let reds = [], greens = [], blues = [], alphas = [], newColor;
let tileSize = 20;

//Shoutout to this guy for saving my code after three days of debugging: https://stackoverflow.com/questions/75402819/how-do-i-load-pixels-from-uploaded-image-file-in-p5js


function setup() {
  createCanvas(400, 400);
  
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
    

  } else {
    img = null;
    img2 = null;
  }
  imgInput.hide();
}

//all pixels are stored in lists
function storeImgValues() {
  img.loadPixels();
  //img.filter(INVERT);
  
  let pixel = 0;
  for (let l = 0; l < img.pixels.length; l += 4) {
    reds[pixel] = img.pixels[l];
    greens[pixel] = img.pixels[l+1];
    blues[pixel] = img.pixels[l+2];
    alphas[pixel] = img.pixels[l+3];
  }
}

function handleImg2() {
  img2.loadPixels();
  img2.filter(INVERT);
}



/*

let input;
let img;
let preview;

function setup() {
  createCanvas(100, 100);

  // Create a file input and place it beneath
  // the canvas.
  input = createFileInput(handleImage);
  input.position(0, 0);

  describe('A gray square with a file input beneath it. If the user selects an image file to load, it is displayed on the square.');
}

function draw() {
  background(200);

  // Draw the image if loaded.
  if (img) {
    img && image(img, width >> 1, height >> 1);
//img.loadPixels();
    let scaleRatio = windowWidth / img.width / 2;

    resizeCanvas(img.width * scaleRatio, img.height * scaleRatio * 2);
    image(img, 0, 0, img.width  * scaleRatio, img.height  * scaleRatio);
    
    /*for (let i = 0; i < img.width; i ++) {
      img.pixels[i] = img.pixels[i + 1];
      img.pixels[i + 1] = img.pixels[i + 2];
      img.pixels[i + 2] = img.pixels[i + 3];
    }*/

    //img.filter(INVERT);
    //updateImage();
//    image(img, 0, img.height * scaleRatio, img.width * scaleRatio, img.height * scaleRatio);
//  }
//}

/*
function updateImage() {
  preview = img;
  preview.filter(INVERT);

}*/

/*
// Create an image if the file is an image.
function handleImage(file) {
  if (file.type === 'image') {
    img = createImg(file.data, '');
    //console.log(img.type);
    img.hide();
    
    //preload();
    img.loadPixels();
    img.filter(INVERT);
    

    
    
  } else {
    img = null;
  }
}


/*
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.8.0/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.8.0/addons/p5.sound.min.js"></script>
  <script defer src="https://scrtwpns.com/mixbox.js"></script>
*/