import { produkte } from "./data.js";
import { formatPrice } from "./utils.js";

let basket = [];

function isMobileBasketView() {
    return window.innerWidth <= 1024;
}

function openBasketPopup() {
    if (!isMobileBasketView()) {
        return;
    }

    document.getElementById("basketWrapper").classList.add("basketPopupOpen");
    document.body.classList.add("noScroll");
}

function closeBasketPopup() {
    const basketWrapper = document.getElementById("basketWrapper");
    if (!basketWrapper) {
        return;
    }

    basketWrapper.classList.remove("basketPopupOpen");
    document.body.classList.remove("noScroll");
}

function setupBasketPopupControls() {
    document.getElementById("mobileBasketBtn").addEventListener("click", openBasketPopup);
    document.getElementById("basketCloseBtn").addEventListener("click", closeBasketPopup);
    document.getElementById("basketOverlay").addEventListener("click", closeBasketPopup);

    window.addEventListener("resize", function () {
        if (!isMobileBasketView()) {
            closeBasketPopup();
        }
    });
}

function setupOrderOverlay() {
    const overlay = document.getElementById("orderOverlay");

    document.getElementById("closeOrderPopup").addEventListener("click", closeOrderPopup);
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeOrderPopup();
        }
    });
}

function showOrderPopup() {
    document.getElementById("orderOverlay").classList.remove("hidden");
    setTimeout(closeOrderPopup, 5000);
}

function closeOrderPopup() {
    document.getElementById("orderOverlay").classList.add("hidden");
}

function addToBasket(id) {
    let product = null;

    for (let i = 0; i < produkte.length; i++) {
        if (produkte[i].id === id) {
            product = produkte[i];
            break;
        }
    }

    let existing = null;

    for (let j = 0; j < basket.length; j++) {
        if (basket[j].id === id) {
            existing = basket[j];
            break;
        }
    }

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

    const btn = document.getElementById("btn-" + id);
    if (btn) {
        btn.innerText = "Added";
        btn.classList.add("added");
    }
}

function changeAmount(id, change) {
    let item = null;

    for (let i = 0; i < basket.length; i++) {
        if (basket[i].id === id) {
            item = basket[i];
            break;
        }
    }

    if (!item) {
        return;
    }

    item.amount += change;

    if (item.amount <= 0) {
        const newBasket = [];

        for (let j = 0; j < basket.length; j++) {
            if (basket[j].id !== id) {
                newBasket.push(basket[j]);
            }
        }

        basket = newBasket;
    }

    renderBasket();
}

function setupAddButtons() {
    const buttons = document.querySelectorAll(".addBtn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            const id = Number(this.dataset.id);
            addToBasket(id);
        });
    }
}

function setupBasketButtons() {
    const minusButtons = document.querySelectorAll(".qtyMinus");
    const plusButtons = document.querySelectorAll(".qtyPlus");

    for (let i = 0; i < minusButtons.length; i++) {
        minusButtons[i].addEventListener("click", function () {
            const id = Number(this.dataset.id);
            changeAmount(id, -1);
        });
    }

    for (let j = 0; j < plusButtons.length; j++) {
        plusButtons[j].addEventListener("click", function () {
            const id = Number(this.dataset.id);
            changeAmount(id, 1);
        });
    }
}

function renderBasket() {
    const basketItems = document.getElementById("basketItems");
    const basketTotal = document.getElementById("basketTotal");
    const buyNowBtn = document.getElementById("buyNowBtn");
    const mobileBasketCount = document.getElementById("mobileBasketCount");

    basketItems.innerHTML = "";
    let subtotal = 0;
    let itemCount = 0;

    for (let i = 0; i < basket.length; i++) {
        const item = basket[i];
        const itemTotal = item.price * item.amount;
        subtotal += itemTotal;
        itemCount += item.amount;

        basketItems.innerHTML += `
            <div class="basketItem">
                <span>${item.name}</span>

                <div class="basketControls">
                    <button type="button" class="qtyMinus" data-id="${item.id}">-</button>
                    <span>${item.amount}</span>
                    <button type="button" class="qtyPlus" data-id="${item.id}">+</button>
                </div>

                <span>${formatPrice(itemTotal)} €</span>
            </div>
        `;
    }

    const delivery = subtotal > 0 ? 4.99 : 0;
    const total = subtotal + delivery;
    mobileBasketCount.innerText = itemCount;

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

    buyNowBtn.onclick = function () {
        if (total === 0) {
            return;
        }

        closeBasketPopup();
        showOrderPopup();

        basket = [];
        renderBasket();

        const addButtons = document.querySelectorAll(".addBtn");
        for (let k = 0; k < addButtons.length; k++) {
            addButtons[k].innerText = "Add to basket";
            addButtons[k].classList.remove("added");
        }
    };

    setupBasketButtons();
}

setupOrderOverlay();
setupBasketPopupControls();
setupAddButtons();
renderBasket();
