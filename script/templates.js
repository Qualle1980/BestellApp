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
                <div class="headerSingleMeal">
                    <h2>${product.name}</h2>
                    <h2 class="mealHeaderPrice">${product.price.toFixed(2)} €</h2>
                </div>

                <p>${product.description}</p>

                <div class="buttonWrapper">
                    <button onclick="addToBasket(${product.id})">Add to basket</button>
                </div>
            </div>
        </section>
    `;
}

export function templateBasket() {
    return `
        <div id="basket">
            <h2>Your Order</h2>

            <div id="basketItems"></div>

            <div id="basketSummary">
                <div id="basketTotal"></div>
                <div id="buyNowBtn">Buy now</div>
            </div>
        </div>
    `;
}

