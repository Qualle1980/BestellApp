import { formatPrice } from "./utils.js";

export function templateCategoryHeader(icon, title) {
    return `
        <header class="categoryHeader">
            <div class="categoryHeaderContent">
                <img src="${icon}" alt="${title}">
                <h1>${title}</h1>
            </div>
        </header>
    `;
}

function mealCardFooter(product) {
    return `
                <div class="mealFooter">
                    <span class="mealPrice">${formatPrice(product.price)} €</span>
                    <div class="buttonWrapper">
                        <button type="button" class="addBtn" id="btn-${product.id}" data-id="${product.id}">
                            Add to basket
                        </button>
                    </div>
                </div>
    `;
}

function mealCardContent(product) {
    return `
            <div class="singleMealContentWrapper">
                <h2 class="mealTitle">${product.name}</h2>
                <p>${product.description}</p>
                ${mealCardFooter(product)}
            </div>
    `;
}

export function createMealCard(product) {
    return `
        <section class="singleMeal">
            <img class="imgMeal" src="${product.img}" alt="${product.name}">
            ${mealCardContent(product)}
        </section>
    `;
}

export function templateQtyLeftButton(item) {
    if (item.amount === 1) {
        return `<button type="button" class="qtyRemove" data-id="${item.id}" aria-label="Remove item">🗑️</button>`;
    }

    return `<button type="button" class="qtyMinus" data-id="${item.id}" aria-label="Decrease amount">-</button>`;
}

export function templateBasketItem(item, itemTotal) {
    const qtyLeft = templateQtyLeftButton(item);
    return `
        <div class="basketItem" id="basketItem-${item.id}">
            <span class="basketItemName">${item.name}</span>
            <div class="basketControls">
                ${qtyLeft}
                <span class="qtyAmount">${item.amount}</span>
                <button type="button" class="qtyPlus" data-id="${item.id}" aria-label="Increase amount">+</button>
            </div>
            <span class="basketItemPrice">${formatPrice(itemTotal)} €</span>
        </div>
    `;
}

function templateSummaryRow(label, amount) {
    return `
        <div class="summaryRow">
            <span>${label}:</span>
            <span>${amount}</span>
        </div>
    `;
}

export function templateBasketSummary(subtotal, delivery, total) {
    const sub = formatPrice(subtotal) + " €";
    const del = formatPrice(delivery) + " €";
    const tot = formatPrice(total) + " €";

    return (
        templateSummaryRow("Subtotal", sub) +
        templateSummaryRow("Delivery", del) +
        `<div class="summaryDivider"></div>
        <h3><span>Total:</span><span>${tot}</span></h3>`
    );
}

function templateBasketPanel() {
    return `
        <div id="basketOverlay"></div>
        <div id="basket">
            <button id="basketCloseBtn" type="button" aria-label="Close basket">×</button>
            <h2>Your Order</h2>
            <div id="basketItems"></div>
            <div id="basketSummary">
                <div id="basketTotal"></div>
                <button id="buyNowBtn" type="button">Buy now</button>
            </div>
        </div>
    `;
}

function templateMobileBasketBtn() {
    return `
        <button id="mobileBasketBtn" type="button" aria-label="Open basket">
            <img src="./assets/icon/shopping-cart-icon-white.png" alt="">
            <span id="mobileBasketCount">0</span>
        </button>
    `;
}

export function templateBasket() {
    return templateBasketPanel() + templateMobileBasketBtn();
}
