let glazingPrices = {
    'Original': {
        priceAdp: 0,
    },
    'Sugar milk': {
        priceAdp: 0,
    },
    'Vanilla milk': {
        priceAdp: 0.5,
    },
    'Double chocolate': {
        priceAdp: 1.5,
    }
};

let packSizes = {
    1: {
        priceAdp: 1,
    },
    3: {
        priceAdp: 3,
    },
    6: {
        priceAdp: 5,
    },
    12:{
        priceAdp: 10,
    }
};

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

const cart = [];
cart.push(new Roll('Original', 'Sugar milk', 1, 2.49));
cart.push(new Roll('Walnut', 'Vanilla milk', 12, 3.49));
cart.push(new Roll('Raisin', 'Sugar milk', 3, 2.99));
cart.push(new Roll('Apple', 'Original', 3, 3.49));

//PARAMS: Takes in class Roll, returns price of that Roll.
function packTotal(pack) {
    return ((pack.basePrice  + glazingPrices[pack.glazing].priceAdp) * packSizes[pack.size].priceAdp).toFixed(2);
}

//Returns price of all items in the cart
function checkoutTotal(cart) {
    let acc = 0;
    for (const pack of cart) {
        acc += Number(packTotal(pack));
    }
    return acc.toFixed(2);
}

function removeItem (pack, productWrapper) {
    cart.splice(cart.indexOf(pack), 1);
    document.querySelector('.cart').removeChild(productWrapper);
    document.querySelector('#total-num').innerText = "$ " + checkoutTotal(cart);
    console.log(cart);
}

//Populates the page with products
function addPacks(cart) {
    for (const pack of cart) {
        const productWrapper = document.createElement('div');
        productWrapper.classList.add('product');
        document.querySelector('.cart').appendChild(productWrapper);
        
        productWrapper.innerHTML = 
            '<div class="product-left">' +
                '<div class="product-img-remove">' +
                    '<div class="img-box">' +
                    '</div>' + 
                    '<div class="remove">' + 
                        '<p>Remove</p>' +
                    '</div>' +
                '</div>' +
                '<div class="pack-info">' +
                    '<p id="roll-type"></p>' +
                    '<p id="glazing"></p>' +
                    '<p id="pack-size"></p>' +
                '</div>' +
            '</div>' + 
            '<p id="pack-price"></p> ';


        const rollImg = document.createElement('img');
        rollImg.src = '../assets/products/' + rolls[pack.type].imageFile;
        rollImg.width = '200';
        rollImg.alt = 'Picture of ' + rolls[pack.type];
        productWrapper.querySelector('.img-box').appendChild(rollImg);

        productWrapper.querySelector('#roll-type').innerText = pack.type + ' cinnamon roll.';
        productWrapper.querySelector('#glazing').innerText = 'Glazing: ' + pack.glazing;
        productWrapper.querySelector('#pack-size').innerText = 'Pack Size: ' + pack.size;
        productWrapper.querySelector('#pack-price').innerText = '$ ' + packTotal(pack);


        productWrapper.querySelector('.remove').addEventListener("click", function() {removeItem(pack, productWrapper)});
    }
}

addPacks(cart);
document.querySelector('#total-num').innerText = "$ " + checkoutTotal(cart);




