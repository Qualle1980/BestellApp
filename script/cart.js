import { produkte } from "./data.js";

let basket = [];

/* Add product to basket */
export function addToBasket(id) {
    const product = produkte.find(p => p.id === id);
    const existing = basket.find(item => item.id === id);

    if (existing) {
        existing.amount++;
    } else {
        basket.push({
            id: product.id,
            name: product.name,
            price: product.price,
            amount: 1
        });
    }

    renderBasket();
}

/* Render basket content */
function renderBasket() {
    const basketItems = document.getElementById("basketItems");
    const basketTotal = document.getElementById("basketTotal");
    const buyNowBtn = document.getElementById("buyNowBtn");

    basketItems.innerHTML = "";
    let subtotal = 0;

    basket.forEach(item => {
        const itemTotal = item.price * item.amount;
        subtotal += itemTotal;

        basketItems.innerHTML += `
            <div class="basketItem">
                <span>${item.name}</span>

                <div class="basketControls">
                    <button onclick="changeAmount(${item.id}, -1)">-</button>
                    <span>${item.amount}</span>
                    <button onclick="changeAmount(${item.id}, 1)">+</button>
                </div>

                <span>${itemTotal.toFixed(2)} €</span>
            </div>
        `;
    });

    const delivery = subtotal > 0 ? 4.99 : 0;
    const total = subtotal + delivery;

    /* Update summary area */
    basketTotal.innerHTML = `
        <div>Subtotal: ${subtotal.toFixed(2)} €</div>
        <div>Delivery: ${delivery.toFixed(2)} €</div>
        <h3>Total: ${total.toFixed(2)} €</h3>
    `;

    /* Update Buy Now button */
    buyNowBtn.innerText = `Buy now (${total.toFixed(2)} €)`;
}

/* Change amount of a product */
window.changeAmount = function (id, change) {
    const item = basket.find(i => i.id === id);

    if (!item) return;

    item.amount += change;

    if (item.amount <= 0) {
        basket = basket.filter(i => i.id !== id);
    }

    renderBasket();
};

window.addToBasket = addToBasket;
