const imageInput = document.getElementById('imageInput');
const originalImage = document.getElementById('originalImage');
const filteredImage = document.getElementById('filteredImage');
const addColorButton = document.getElementById('addColorButton');
const paletteContainer = document.getElementById('paletteContainer');
const widthField = document.getElementById('widthField');
const heightField = document.getElementById('heightField');
const paletteEntries = document.querySelector('.palette-entry');
let w = 0, h = 0;

const colorPalette = [
    [0, 0, 0, null, 0]
];

//palettePush([Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]);



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

  palettePush(newColor);

  }
  

  originalImage.style.display = 'none';
  filteredImage.style.display = 'none';
  addColorButton.style.display = 'none';
  document.getElementById('dimensions').style.display = 'none';

  function applyFilter() {

    document.getElementById('info-box').style.display = 'none';
    addColorButton.style.display = 'block';
    document.getElementById('dimensions').style.display = 'block';
    originalImage.style.display = 'block';
    filteredImage.style.display = 'block';

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
        ctx.drawImage(img, 0, 0);
  
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
        const data = imageData.data;
        
        //Reseting the count
        for(let i = 0; i < colorPalette.length; i++) {
            colorPalette[i][4] = 0
        }
  
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
  
          let minDistance = Infinity;
          let closestColorIndex = 0;
  
          for (let j = 0; j < colorPalette.length; j++) {
            const [pr, pg, pb] = colorPalette[j];
            const distance = Math.sqrt((r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2);
            if (distance < minDistance) {
              minDistance = distance;
              closestColorIndex = j;
            }
          }
  
          const [cr, cg, cb] = colorPalette[closestColorIndex];
          colorPalette[closestColorIndex][4] += 1; //Adding to the count
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
    calculateColorAreas();
  }


imageInput.addEventListener('change', applyFilter);

addColorButton.addEventListener('click', addColor);


function addColor (event) {
    palettePush([Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]);
}


function palettePush ([r,g, b]) {

    const entry = document.createElement('div');
    entry.classList.add('palette-entry');

    let colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = rgbToHex(r, g, b);
    colorPicker.addEventListener("change", updateColors, false); //Change to 'change' for changing when exiting
    colorPicker.select();
    entry.appendChild(colorPicker);

    const colorName = document.createElement('p');
    colorName.classList.add('color-name');
    colorName.classList.add('palette-entry-text');
    getColorName(colorPicker.value).then(result => {
        colorName.innerText = result
    });
    entry.appendChild(colorName);

    const sqft = document.createElement('p');
    sqft.classList.add('sqft');
    sqft.classList.add('palette-entry-text');
    entry.appendChild(sqft);

    const cans = document.createElement('p');
    cans.classList.add('cans');
    entry.appendChild(cans);

    const gallons = document.createElement('p');
    gallons.classList.add('gallons');
    entry.appendChild(gallons);

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove Color';
    removeButton.classList.add('remove-button');
    entry.appendChild(removeButton);
    removeButton.addEventListener('click', (event) => 
        {
            removeColorFromPalette(entry);
            entry.remove();
        });
    

    paletteContainer.appendChild(entry);

    colorPalette.push([r, g, b, entry, 0]);
    applyFilter();
}
// color, name, sqft, cans, gallons

function removeColorFromPalette(entry) {
    for (let i = 0; i < colorPalette.length; i++) {
        if (entry === colorPalette[i][3]) {
            colorPalette.splice(i, 1)
            applyFilter();
            break;
        }
        
    }
}


function updateColors(event) {

    //this.parentElement.querySelector('.color-name').innerText = event.target.value;
    //console.log(getColorName(event.target.value).then(result => {return result;}));
    //this.parentElement.querySelector('.color-name').innerText = getColorName(event.target.value).then(result => {return result;});

    getColorName(event.target.value).then(result => {
        this.parentElement.querySelector('.color-name').innerText = result
    });



    //const c = getColorName('#FF0000').then((result) => {return result;});

  //console.log(c);
    for (let i = 0; i < colorPalette.length; i++) {
        if (this.parentElement === colorPalette[i][3]) {
            let newColor = hexToRgb(event.target.value);
            colorPalette[i][0] = newColor[0];
            colorPalette[i][1] = newColor[1];
            colorPalette[i][2] = newColor[2];
            applyFilter();
            break;
        }
        
    }

}


function calculateColorAreas () {

    let area = w * h;
    let totalColors = 0;
    for(let i = 0; i < colorPalette.length; i++) {
        totalColors += colorPalette[i][4];
    }
    
    for(let i = 0; i < document.getElementById('paletteContainer').children.length; i++) {
        const entry = document.getElementById('paletteContainer').children[i];
        
        let colorArea = area * colorPalette[i][4] / totalColors;
        entry.querySelector('.sqft').innerText = colorArea.toFixed(1) + ' sqft';
        entry.querySelector('.cans').innerText = (colorArea / 25).toFixed(1) + ' cans';
        entry.querySelector('.gallons').innerText = (colorArea / 350).toFixed(1) + ' gallons';
        
    }
}

widthField.addEventListener('change', (event) => {
    
    if(event.target.value >= 0) {
        
        w = event.target.value;
        calculateColorAreas();
    }
}) 

heightField.addEventListener('change', (event) => {

    if(event.target.value >= 0) {
        h = event.target.value;
        calculateColorAreas();
    }
}) 


async function getColorName(hexCode) {
    const url = 'https://api.color.pizza/v1/?values=' + hexCode.slice(1) + '&list=xkcd';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      //console.log(json);
      //console.log(json.paletteTitle)
      return json.paletteTitle;
    } catch (error) {
      console.error(error.message);
    }
  }



function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    // Remove the # if present
    hex = hex.replace("#", "");
  
    // Check if it's a 3-digit hex code
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
  
    // Parse the hex values into decimal
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
  
    return [r, g, b];
}


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