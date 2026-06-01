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

export function createMealCard(product) {
    return `
        <section class="singleMeal">
            <img class="imgMeal" src="${product.img}" alt="${product.name}">
            
            <div class="singleMealContentWrapper">
                <h2 class="mealTitle">${product.name}</h2>
                <p>${product.description}</p>

                <div class="mealFooter">
                    <span class="mealPrice">${formatPrice(product.price)} €</span>
                    <div class="buttonWrapper">
                        <button 
                            type="button"
                            class="addBtn"
                            id="btn-${product.id}"
                            data-id="${product.id}">
                            Add to basket
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;
}

export function templateBasketItem(item, itemTotal) {
    const minusOrRemove =
        item.amount === 1
            ? `<button type="button" class="qtyRemove" data-id="${item.id}" aria-label="Remove item">🗑️</button>`
            : `<button type="button" class="qtyMinus" data-id="${item.id}" aria-label="Decrease amount">-</button>`;

    return `
        <div class="basketItem">
            <span class="basketItemName">${item.name}</span>
            <div class="basketControls">
                ${minusOrRemove}
                <span class="qtyAmount">${item.amount}</span>
                <button type="button" class="qtyPlus" data-id="${item.id}" aria-label="Increase amount">+</button>
            </div>
            <span class="basketItemPrice">${formatPrice(itemTotal)} €</span>
        </div>
    `;
}

export function templateBasketSummary(subtotal, delivery, total) {
    return `
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
}

export function templateBasket() {
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
        <button id="mobileBasketBtn" type="button" aria-label="Open basket">
            <img src="./assets/icon/shopping-cart-icon-white.png" alt="">
            <span id="mobileBasketCount">0</span>
        </button>
    `;
}
