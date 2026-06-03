import { formatPrice } from "./utils.js";

export function templateCategoryHeader(icon, title, mobileTitle = title) {
    return `
        <header class="categoryHeader">
            <div class="categoryHeaderContent">
                <img src="${icon}" alt="${title}">
                <h1>
                    <span class="categoryTitleDesktop">${title}</span>
                    <span class="categoryTitleMobile">${mobileTitle}</span>
                </h1>
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

export function templateBasketItem(item, itemTotal) {
    return `
        <div class="basketItem" id="basketItem-${item.id}">
            <div class="basketItemHeader">
                <span class="basketItemName">${item.name}</span>
            </div>
            <div class="basketItemFooter">
                <div class="basketControls">
                    <button type="button" class="qtyMinus" data-id="${item.id}" aria-label="Decrease amount">-</button>
                    <span class="qtyAmount">${item.amount}</span>
                    <button type="button" class="qtyPlus" data-id="${item.id}" aria-label="Increase amount">+</button>
                </div>
                <span class="basketItemPrice">${formatPrice(itemTotal)} €</span>
            </div>
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
            <div id="basketHeader">
                <h2>Your Order</h2>
                <button id="clearBasketBtn" type="button" aria-label="Clear basket">🗑️</button>
            </div>
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
            <img src="./assets/icon/shopping-cart-orange.png" alt="">
            <span id="mobileBasketCount">0</span>
        </button>
    `;
}

export function templateBasket() {
    return templateBasketPanel() + templateMobileBasketBtn();
}
