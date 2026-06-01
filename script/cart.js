import { produkte } from "./data.js";
import { formatPrice } from "./utils.js";
import {
    templateBasketItem,
    templateBasketSummary,
    templateQtyLeftButton
} from "./templates.js";

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

function getBasketRow(id) {
    return document.getElementById("basketItem-" + id);
}

function appendBasketItemToDom(item) {
    const itemTotal = item.price * item.amount;
    const html = templateBasketItem(item, itemTotal);

    document.getElementById("basketItems").insertAdjacentHTML("beforeend", html);
}

function removeQtyLeftButtons(controls) {
    const minusBtn = controls.querySelector(".qtyMinus");
    const removeBtn = controls.querySelector(".qtyRemove");

    if (minusBtn) {
        minusBtn.remove();
    }

    if (removeBtn) {
        removeBtn.remove();
    }
}

function replaceQtyLeftButton(item) {
    const controls = getBasketRow(item.id).querySelector(".basketControls");
    removeQtyLeftButtons(controls);
    controls.querySelector(".qtyAmount").insertAdjacentHTML("beforebegin", templateQtyLeftButton(item));
}

function updateBasketItemInDom(item) {
    const row = getBasketRow(item.id);
    if (!row) {
        return;
    }

    const itemTotal = item.price * item.amount;
    row.querySelector(".qtyAmount").innerText = item.amount;
    row.querySelector(".basketItemPrice").innerText = formatPrice(itemTotal) + " €";
    replaceQtyLeftButton(item);
}

function removeBasketItemFromDom(id) {
    const row = getBasketRow(id);
    if (row) {
        row.remove();
    }
}

function clearBasketItemsDom() {
    document.getElementById("basketItems").innerHTML = "";
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

function updateBasketSummary() {
    const totals = calcBasketTotals();

    document.getElementById("mobileBasketCount").innerText = totals.itemCount;
    document.getElementById("basketTotal").innerHTML = templateBasketSummary(
        totals.subtotal,
        totals.delivery,
        totals.total
    );

    return totals;
}

function handleBasketButtonClick(btn) {
    const id = Number(btn.dataset.id);

    if (btn.classList.contains("qtyPlus")) {
        changeAmount(id, 1);
    } else if (btn.classList.contains("qtyMinus")) {
        changeAmount(id, -1);
    } else if (btn.classList.contains("qtyRemove")) {
        removeFromBasket(id);
    }
}

function onBasketItemsClick(event) {
    if (event.target.tagName !== "BUTTON") {
        return;
    }

    handleBasketButtonClick(event.target);
}

function setupBasketItemListeners() {
    document.getElementById("basketItems").addEventListener("click", onBasketItemsClick);
}

function updateBasketAfterAdd(id, existing, product) {
    if (existing) {
        existing.amount++;
        updateBasketItemInDom(existing);
        return;
    }

    pushNewBasketItem(product);
    appendBasketItemToDom(findBasketItemById(id));
}

function addToBasket(id) {
    const product = findProductById(id);
    const existing = findBasketItemById(id);

    updateBasketAfterAdd(id, existing, product);
    updateBasketSummary();
    markButtonAsAdded(id);
}

function changeAmount(id, change) {
    const item = findBasketItemById(id);
    if (!item) {
        return;
    }

    item.amount += change;
    if (item.amount <= 0) {
        removeFromBasket(id);
    } else {
        updateBasketItemInDom(item);
        updateBasketSummary();
    }
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
    removeBasketItemFromDom(id);
    updateBasketSummary();
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
    clearBasketItemsDom();
    updateBasketSummary();
    resetAddButtons();
}

function setupBuyNowButton() {
    document.getElementById("buyNowBtn").onclick = function () {
        const totals = calcBasketTotals();
        handleBuyNow(totals.total);
    };
}

setupOrderOverlay();
setupBasketPopupControls();
setupAddButtons();
setupBasketItemListeners();
setupBuyNowButton();
updateBasketSummary();
