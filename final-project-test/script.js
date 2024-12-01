const imageInput = document.getElementById('imageInput');
const filterButton = document.getElementById('filterButton');
const originalImage = document.getElementById('originalImage');
const filteredImage = document.getElementById('filteredImage');
const addColorButton = document.getElementById('addColorButton');
const paletteContainer = document.getElementById('paletteContainer');

const colorPalette = [
    [0, 0, 0], // Red
    //[0, 255, 0], // Green
    //[0, 0, 255], // Blue
   // [255, 255, 0], // Yellow
    //[255, 0, 255], // Magenta
   // [35, 66, 9],
    /*[0, 33, 19],
    [200, 221, 221],
    [100, 188, 100],
    [64, 45, 30],
    [134, 191, 227],
    [227, 204, 134],
    [58, 181, 89],
    [156, 88, 28]*/
];

function addColorToPalette(event) {

    const imgRect = originalImage.getBoundingClientRect();
  //const scaleX = originalImage.width / imgRect.width;
  //const scaleY = originalImage.height / imgRect.height;

  // Create a canvas to resize the image
  const resizeCanvas = document.createElement('canvas');
  const resizeCtx = resizeCanvas.getContext('2d');
  resizeCanvas.width = imgRect.width;
  resizeCanvas.height = imgRect.height;
  resizeCtx.drawImage(originalImage, 0, 0, imgRect.width, imgRect.height);

  const x = event.clientX - imgRect.left;
  const y = event.clientY - imgRect.top;

  const pixelData = resizeCtx.getImageData(x, y, 1, 1).data;
  const newColor = [pixelData[0], pixelData[1], pixelData[2]];

  colorPalette.push(newColor);
  applyFilter();
  
    
    
    //*/

    
  }
  
  function applyFilter() {
    const file = imageInput.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
  
      img.onload
   = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 
   0);
  
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
        const data = imageData.data;
  
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i 
   + 2];
  
          let minDistance = Infinity;
          let closestColorIndex 
   = 0;
  
          for (let j = 0; j < colorPalette.length; j++) {
            const [pr, pg, pb] = colorPalette[j];
            const distance = Math.sqrt((r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2);
            //const distance = colorDistance(r, g, b, pr, pb, pg)
            if (distance < minDistance) {
              minDistance = distance;
              closestColorIndex = j;
            }
          }
  
          const [cr, cg, cb] = colorPalette[closestColorIndex];
          data[i] = cr;
          data[i + 1] = cg;
          data[i + 2] = cb;
        }
  
        ctx.putImageData(imageData, 0, 0);
        filteredImage.src = canvas.toDataURL();
        originalImage.src = event.target.result;
      };
    };
  
    reader.readAsDataURL(file);
  }
  
filterButton.addEventListener('click', applyFilter);

addColorButton.addEventListener('click', addColor);

function addColor (event) {
    palettePush([Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]);
}

function palettePush ([r,g, b]) {
    const entry = document.createElement('div');
    entry.classList.add('palette-entry');

    const chip = document.createElement('div')
    chip.classList.add('color-chip');
    chip.innerHTML = '<input type="color" id="head" name="head" value="#e66465" />';
    entry.appendChild(chip);

    const colorName = document.createElement('div');
    colorName.classList.add('palette-entry-text');
    colorName.innerHTML = '<p>Yeah</p>';
    entry.appendChild(colorName);

    const sqft = document.createElement('div');
    sqft.classList.add('palette-entry-text');
    sqft.innerHTML = '<p>Yeah</p>';
    entry.appendChild(sqft);

    const cans = document.createElement('div');
    cans.classList.add('palette-entry-text');
    cans.innerHTML = '<p>Yeah</p>';
    entry.appendChild(cans);

    const gallons = document.createElement('div');
    gallons.classList.add('palette-entry-text');
    gallons.innerHTML = '<p>Yeah</p>';
    entry.appendChild(gallons);


    paletteContainer.appendChild(entry);
}
// color, name, sqft, cans, gallons



  /*
  function colorDistance(r, g, b, pr, pg, pb)
{
    let rmean = (r + pr) >> 1;
    let r1 = r - pr;
    let g1 = g - pg;
    let b1 = b - pb;
    return Math.sqrt((((512+rmean)*r1*r1)>>8) + 4*g1*g1 + (((767-rmean)*b1*b1)>>8));
}
    */