import { produkte } from "./data.js";
import { templateBasketItem, templateBasketSummary } from "./templates.js";

let basket = [];

function isMobileBasketView() {
    return window.innerWidth <= 1244;
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

function removeFromBasket(id) {
    const newBasket = [];

    for (let j = 0; j < basket.length; j++) {
        if (basket[j].id !== id) {
            newBasket.push(basket[j]);
        }
    }

    basket = newBasket;
    renderBasket();
}

function setupBasketButtons() {
    const minusButtons = document.querySelectorAll(".qtyMinus");
    const plusButtons = document.querySelectorAll(".qtyPlus");
    const removeButtons = document.querySelectorAll(".qtyRemove");

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

    for (let k = 0; k < removeButtons.length; k++) {
        removeButtons[k].addEventListener("click", function () {
            removeFromBasket(Number(this.dataset.id));
        });
    }
}

function calcBasketTotals() {
    let subtotal = 0;
    let itemCount = 0;

    for (let i = 0; i < basket.length; i++) {
        subtotal += basket[i].price * basket[i].amount;
        itemCount += basket[i].amount;
    }

    const delivery = subtotal > 0 ? 4.99 : 0;

    return { subtotal, itemCount, delivery, total: subtotal + delivery };
}

function buildBasketItemsHtml() {
    let html = "";

    for (let i = 0; i < basket.length; i++) {
        const item = basket[i];
        html += templateBasketItem(item, item.price * item.amount);
    }

    return html;
}

function resetAddButtons() {
    const addButtons = document.querySelectorAll(".addBtn");

    for (let k = 0; k < addButtons.length; k++) {
        addButtons[k].innerText = "Add to basket";
        addButtons[k].classList.remove("added");
    }
}

function handleBuyNow(total) {
    if (total === 0) {
        return;
    }

    closeBasketPopup();
    showOrderPopup();
    basket = [];
    renderBasket();
    resetAddButtons();
}

function renderBasket() {
    const totals = calcBasketTotals();

    document.getElementById("basketItems").innerHTML = buildBasketItemsHtml();
    document.getElementById("mobileBasketCount").innerText = totals.itemCount;
    document.getElementById("basketTotal").innerHTML = templateBasketSummary(
        totals.subtotal,
        totals.delivery,
        totals.total
    );
    document.getElementById("buyNowBtn").onclick = function () {
        handleBuyNow(totals.total);
    };

    setupBasketButtons();
}

setupOrderOverlay();
setupBasketPopupControls();
setupAddButtons();
renderBasket();
