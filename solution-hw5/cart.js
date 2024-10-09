//Price calculations

let curSelection = {
    total: basePrice,
    glazingPrice: 0,
    packPrice: 1,
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
    updateTotal();
}

function packChange(element) {
    curSelection.packPrice = parseFloat(element.value);
    updateTotal();
}

document.getElementById("detail-price").textContent = "$" + curSelection.total.toString();


//Cart handeling

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

const cart = [];

cart.push(new Roll('Original', 'Sugar Milk', 1, 2.49));
cart.push(new Roll('Walnut', 'Vanilla Milk', 12, 3.49));
cart.push(new Roll('Raisin', 'Sugar Milk', 3, 2.99));
cart.push(new Roll('Apple', 'Original', 3, 3.49));

function addPacks() {
    for (const pack of cart) {
        const productWrapper = document.createElement();
        productWrapper.outerHtml = 
        '<div class="product">' +
            '<div class="product-left">' +
                '<div class="product-img-remove">' +
                    '<div class="img-box">' +
                    '</div>' + 
                   '<div class="remove">' + 
                '<p>Remove</p>' +
            '</div>' +
            '</div>' +
                '<p id="pRollName"></p>' +
                '<p id="pGlazing"></p>' +
                '<p id="pPackSize"></p>' +
            '</div>' + 
            '<p>$ 2.49</p> ' +
        '</div>';

        document.querySelector('cart').appendChild(productWrapper);

    }
}


/*
<div class="product">
    <div class="product-left">
        <div class="product-img-remove">
            <div class="img-box">
              <img src="../assets/products/original-cinnamon-roll.jpg" width="200"
                alt="Picture of original cinnamon roll" />
            </div>
            <div class="remove">
              <p>Remove</p>
            </div>
          </div>
          <p>Original cinnamon roll. <br> Glazing: Keep original <br> Pack Size: 1</p>
        </div>
        <p>$ 2.49</p> 
      </div>
*/



