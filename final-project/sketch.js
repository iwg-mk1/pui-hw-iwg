let input;
let img;


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
    resizeCanvas(img.width, img.height * 2);
    image(img, 0, 0, img.width, img.height);
    
    for (let i = 0; i < img.pixels.length; i += 4) {
      img.pixels[i] = img.pixels[i + 1];
      img.pixels[i + 1] = img.pixels[i + 2];
      img.pixels[i + 2] = img.pixels[i + 3];
    }
    img.updatePixels();
    image(img, 0, img.height, img.width, img.height);
  }
}


// Create an image if the file is an image.
function handleImage(file) {
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.loadPixels();
    img.hide();
  } else {
    img = null;
  }
}


/*
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.8.0/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.8.0/addons/p5.sound.min.js"></script>
  <script defer src="https://scrtwpns.com/mixbox.js"></script>
*/