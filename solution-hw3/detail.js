const basePrice = 2.49;

let curSelection = {
    total: basePrice,
    glazingPrice: 0,
    packPrice: 1
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
    document.getElementById("detail-price").textContent = curSelection.total.toString();
}

function glazingChange(element) {
    curSelection.glazingPrice = parseFloat(element.value);
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
    option.text = glazingPrices[i].glaze
    option.value = glazingPrices[i].priceAdp;

    selectGlaze.add(option);
}

for (let i = 0; i < packSizes.length; i++) {
    var option = document.createElement('option');
    option.text = packSizes[i].size;
    option.value = packSizes[i].priceAdp;

    selectPackSize.add(option);
}

/*

selectGlaze.addEventListener('change', glazingChange);
selectPackSize.addEventListener('change', packChange);
*/
document.getElementById("detail-price").textContent = curSelection.total.toString();


