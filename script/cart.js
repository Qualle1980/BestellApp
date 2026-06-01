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

function onWindowResize() {
    if (!isMobileBasketView()) {
        closeBasketPopup();
    }
}

function setupBasketPopupControls() {
    document.getElementById("mobileBasketBtn").addEventListener("click", openBasketPopup);
    document.getElementById("basketCloseBtn").addEventListener("click", closeBasketPopup);
    document.getElementById("basketOverlay").addEventListener("click", closeBasketPopup);
    window.addEventListener("resize", onWindowResize);
}

function onOrderOverlayClick(event) {
    const overlay = document.getElementById("orderOverlay");
    if (event.target === overlay) {
        closeOrderPopup();
    }
}

function setupOrderOverlay() {
    const overlay = document.getElementById("orderOverlay");
    document.getElementById("closeOrderPopup").addEventListener("click", closeOrderPopup);
    overlay.addEventListener("click", onOrderOverlayClick);
}

function showOrderPopup() {
    document.getElementById("orderOverlay").classList.remove("hidden");
    setTimeout(closeOrderPopup, 5000);
}

function closeOrderPopup() {
    document.getElementById("orderOverlay").classList.add("hidden");
}

function findProductById(id) {
    for (let i = 0; i < produkte.length; i++) {
        if (produkte[i].id === id) {
            return produkte[i];
        }
    }

    return null;
}

function findBasketItemById(id) {
    for (let j = 0; j < basket.length; j++) {
        if (basket[j].id === id) {
            return basket[j];
        }
    }

    return null;
}

function filterBasketExcludingId(id) {
    const newBasket = [];

    for (let j = 0; j < basket.length; j++) {
        if (basket[j].id !== id) {
            newBasket.push(basket[j]);
        }
    }

    return newBasket;
}

function pushNewBasketItem(product) {
    basket.push({
        id: product.id,
        name: product.name,
        price: product.price,
        amount: 1
    });
}

function markButtonAsAdded(id) {
    const btn = document.getElementById("btn-" + id);
    if (!btn) {
        return;
    }

    btn.innerText = "Added";
    btn.classList.add("added");
}

function addToBasket(id) {
    const product = findProductById(id);
    const existing = findBasketItemById(id);

    if (existing) {
        existing.amount++;
    } else {
        pushNewBasketItem(product);
    }

    renderBasket();
    markButtonAsAdded(id);
}

function changeAmount(id, change) {
    const item = findBasketItemById(id);
    if (!item) {
        return;
    }

    item.amount += change;

    if (item.amount <= 0) {
        basket = filterBasketExcludingId(id);
    }

    renderBasket();
}

function onAddButtonClick() {
    addToBasket(Number(this.dataset.id));
}

function setupAddButtons() {
    const buttons = document.querySelectorAll(".addBtn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", onAddButtonClick);
    }
}

function removeFromBasket(id) {
    basket = filterBasketExcludingId(id);
    renderBasket();
}

function bindClickToButtons(selector, handler) {
    const buttons = document.querySelectorAll(selector);

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", handler);
    }
}

function onQtyMinusClick() {
    changeAmount(Number(this.dataset.id), -1);
}

function onQtyPlusClick() {
    changeAmount(Number(this.dataset.id), 1);
}

function onQtyRemoveClick() {
    removeFromBasket(Number(this.dataset.id));
}

function setupBasketButtons() {
    bindClickToButtons(".qtyMinus", onQtyMinusClick);
    bindClickToButtons(".qtyPlus", onQtyPlusClick);
    bindClickToButtons(".qtyRemove", onQtyRemoveClick);
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

function updateBasketView(totals) {
    document.getElementById("basketItems").innerHTML = buildBasketItemsHtml();
    document.getElementById("mobileBasketCount").innerText = totals.itemCount;
    document.getElementById("basketTotal").innerHTML = templateBasketSummary(
        totals.subtotal,
        totals.delivery,
        totals.total
    );
}

function bindBuyNow(total) {
    document.getElementById("buyNowBtn").onclick = function () {
        handleBuyNow(total);
    };
}

function renderBasket() {
    const totals = calcBasketTotals();
    updateBasketView(totals);
    bindBuyNow(totals.total);
    setupBasketButtons();
}

setupOrderOverlay();
setupBasketPopupControls();
setupAddButtons();
renderBasket();
