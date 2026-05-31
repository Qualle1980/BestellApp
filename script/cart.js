import { produkte } from "./data.js";

let basket = [];

/* cental format price */
function formatPrice(value) {
    return value.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

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

                <span>${formatPrice(itemTotal)} €</span>
            </div>
        `;
    });

    const delivery = subtotal > 0 ? 4.99 : 0;
    const total = subtotal + delivery;

    /* Update summary area */
    basketTotal.innerHTML = `
        <div class="summaryRow">
            <span>Subtotal:</span>
            <span>${formatPrice(subtotal)} €</span>
        </div>

        <div class="summaryRow">
            <span>Delivery:</span>
            <span>${formatPrice(delivery)} €</span>
        </div>

        <div class="summaryDivider"></div>

        <h3>
            <span>Total:</span>
            <span>${formatPrice(total)} €</span>
        </h3>
    `;

    /* Update Buy Now button */
    buyNowBtn.innerText = `Buy now (${formatPrice(total)} €)`;
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
