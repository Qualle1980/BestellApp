import { produkte } from "./data.js";
import { templateCategoryHeader, createMealCard, templateBasket } from "./templates.js";

const sectionMenu = document.getElementById("sectionMenu");

const categories = [
    {
        name: "burger",
        label: "Burger & Sandwiches",
        mobileLabel: "Burger",
        icon: "assets/icon/burger-icon.png"
    },
    {
        name: "pizza",
        label: "Pizza (30cm)",
        mobileLabel: "Pizza (30cm)",
        icon: "assets/icon/pizza-icon.png"
    },
    {
        name: "salad",
        label: "Salads",
        mobileLabel: "Salads",
        icon: "assets/icon/salad-icon.png"
    }
];

function renderCategoryProducts(categoryName) {
    for (let p = 0; p < produkte.length; p++) {
        if (produkte[p].category !== categoryName) {
            continue;
        }

        sectionMenu.insertAdjacentHTML("beforeend", createMealCard(produkte[p]));
    }
}

function renderCategory(category) {
    sectionMenu.insertAdjacentHTML(
        "beforeend",
        templateCategoryHeader(category.icon, category.label, category.mobileLabel)
    );
    renderCategoryProducts(category.name);
}

function renderMenu() {
    for (let c = 0; c < categories.length; c++) {
        renderCategory(categories[c]);
    }
}

function setupBasketInDom() {
    document.getElementById("basketWrapper").innerHTML = templateBasket();
    document
        .getElementById("mobileNav")
        .appendChild(document.getElementById("mobileBasketBtn"));
}

setupBasketInDom();
renderMenu();
