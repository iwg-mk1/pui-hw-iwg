const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

const rollName = rollType + " cinnamon roll";
document.getElementById('roll-name').textContent = rollName;

let rollImg = document.createElement('img');
rollImg.src = '../assets/products/' + rolls[rollType].imageFile;
rollImg.width = '600';
rollImg.alt = 'Picture of ' + rollName;
document.getElementById('roll-img').appendChild(rollImg);


//Price calculations

const basePrice = rolls[rollType].basePrice;

let curSelection = {
    total: basePrice,
    glazingPrice: 0,
    packPrice: 1,
    glazingType: 'Keep original'
};

let glazingPrices = [
    {
        glaze: 'Keep original',
        priceAdp: 0,
    },
    {
        glaze: 'Sugar milk',
        priceAdp: 0,
    },
    {
        glaze: 'Vanilla milk',
        priceAdp: 0.5,
    },
    {
        glaze: 'Double chocolate',
        priceAdp: 1.5,
    }
];

let packSizes = [
    {
        size: 1,
        priceAdp: 1,
    },
    {
        size: 3,
        priceAdp: 3,
    },
    {
        size: 6,
        priceAdp: 5,
    },
    {
        size: 12,
        priceAdp: 10,
    }
];

function updateTotal() {
    curSelection.total = ((basePrice + curSelection.glazingPrice) * curSelection.packPrice).toFixed(2);
    document.getElementById("detail-price").textContent = "$" + curSelection.total.toString();
}

function glazingChange(element) {
    curSelection.glazingPrice = parseFloat(element.value);
    curSelection.glazingType = element.text;
    console.log(curSelection.glazingPrice);
    updateTotal();
}

function packChange(element) {
    curSelection.packPrice = parseFloat(element.value);
    console.log(curSelection.packPrice);
    updateTotal();
}


let selectGlaze = document.querySelector('#glazing');
let selectPackSize = document.querySelector('#pack-size');


for (let i = 0; i < glazingPrices.length; i++) {
    let option = document.createElement('option');
    option.text = glazingPrices[i].glaze;
    option.value = glazingPrices[i].priceAdp;

    selectGlaze.add(option);
}

for (let i = 0; i < packSizes.length; i++) {
    var option = document.createElement('option');
    option.text = packSizes[i].size;
    option.value = packSizes[i].priceAdp;

    selectPackSize.add(option);
}

document.getElementById("detail-price").textContent = "$" + curSelection.total.toString();


//Cart handeling

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

const cart = [];

function pushCart() {
    cart.push(new Roll(rollType, curSelection.glazingType, curSelection.packSize, basePrice));
    console.log(cart);
}

document.getElementById('cart-button').addEventListener('click', pushCart);




