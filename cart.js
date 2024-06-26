

function addItemToCart() {
    var itemName = localStorage.getItem('itemName');
    var itemPrice = localStorage.getItem('itemPrice');
    addToCart(itemName, itemPrice);
}

const addToCart = function(name, price){
    let cartItems = localStorage.getItem('cartItems');
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    if(name==null && price==null) return;
    const existingItem = cartItems.find(item => item.name === name);
    if (!existingItem) {
        cartItems.push({ name, price });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    updateCartDisplay();
    calculateBill();
    
}

const removeItemFromCart = function(name) {
    let cartItems = localStorage.getItem('cartItems');
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    const updatedCartItems = cartItems.filter(item => item.name !== name);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateCartDisplay();
    calculateBill();
}

const updateCartDisplay = function() {
    const cartBody = document.querySelector(".items");
    cartBody.innerHTML = '';
    let cartItems = localStorage.getItem('cartItems');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    cartItems.forEach(item => {
        const cartRow = document.createElement("tr");
        const cartItemName = document.createElement("td");
        const cartItemPrice = document.createElement("td");
        cartItemName.innerText = item.name;
        cartItemPrice.innerText = item.price;
        cartItemPrice.classList.add("price");
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.addEventListener("click", () => removeItemFromCart(item.name));
        cartRow.appendChild(cartItemName);
        cartRow.appendChild(cartItemPrice);
        cartRow.appendChild(removeBtn);
        cartBody.appendChild(cartRow);
    });
}

const calculateBill = ()=>{
    let total = 0;
    itemPrices = document.querySelectorAll(".price");
    for (p of itemPrices){
        if (p!=null){
            total += parseFloat(p.innerText.replace('$',''));
        }
    }

    if(total!=0 && !isNaN(total)){
        document.getElementById("bill").innerText = "$" + total.toFixed(2)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    addItemToCart();
});

let orderBtn = document.querySelector(".butt");
orderBtn.addEventListener("click", ()=>{
    alert("Order placed!");
})

