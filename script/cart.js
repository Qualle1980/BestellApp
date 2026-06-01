import { produkte } from "./data.js";

let basket = [];

/* Price Formatter */
function formatPrice(value) {
    return value.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/* Create Order Overlay (JS Only) */
function createOrderOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "orderOverlay";
    overlay.classList.add("hidden");

    overlay.innerHTML = `
        <div id="orderPopup">
            <button id="closeOrderPopup">×</button>
            <img src="./assets/icon/delivery-truck-icon.png" alt="delivery">
            <h2>Order confirmed!</h2>
            <p>Your food is on the way!</p>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("closeOrderPopup").addEventListener("click", closeOrderPopup);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeOrderPopup();
    });
}

createOrderOverlay();

/* Show / Close Popup */
function showOrderPopup() {
    const overlay = document.getElementById("orderOverlay");
    overlay.classList.remove("hidden");

    setTimeout(closeOrderPopup, 5000);
}

function closeOrderPopup() {
    const overlay = document.getElementById("orderOverlay");
    overlay.classList.add("hidden");
}

/* Add Product To Basket */
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

    const btn = document.getElementById(`btn-${id}`);
    if (btn) {
        btn.innerText = "Added";
        btn.classList.add("added");
    }
}

/* Render Basket */
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

    buyNowBtn.onclick = () => {
        if (total === 0) return;

        showOrderPopup();

        basket = [];
        renderBasket();

        document.querySelectorAll(".addBtn").forEach(btn => {
            btn.innerText = "Add to basket";
            btn.classList.remove("added");
        });
    };
}

/* Change Amount */
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
