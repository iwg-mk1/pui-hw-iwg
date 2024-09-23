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
    curSelection.total = (basePrice + curSelection.glazingPrice) * curSelection.packPrice;
    let totalElement = document.querySelector('#detail-price');
    totalElement.innerText = curSelection.total;
}

function glazingChange(element) {
    curSelection.glazingPrice = element.priceAdp;
    updateTotal();
}

function packChange(element) {
    curSelection.glazingPrice = element.priceAdp;
    updateTotal();
}


let selectGlaze = document.querySelector('#glazing');
let selectPackSize = document.querySelector('#pack-size');

/*
for(element in glazingPrices)
    {
       var option = document.createElement('option');
       option.value = index;
       option.text = glazingPrices.glaze;
    
       selectGlazing.add(option);
       index++;
    }
       */

    for(let i = 0; i < glazingPrices.length; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.text = glazingPrices.glaze;
        
        selectGlazing.add(option);
    }


selectGlaze.addEventListener('change', glazingChange);
selectPackSize.addEventListener('change', packChange);


document.getElementById("detail-price").textContent = "New text!";


