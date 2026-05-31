import { produkte } from "./data.js";
import { templateCategoryHeader, createMealCard, templateBasket } from "./templates.js";

/* Render basket container */
document.getElementById("basketWrapper").innerHTML = templateBasket();

/* Menu container */
const sectionMenu = document.getElementById("sectionMenu");

/* Category definitions */
const categories = [
    {
        name: "burger",
        label: "Burger & Sandwiches",
        icon: "assets/icon/burger-icon.png"
    },
    {
        name: "pizza",
        label: "Pizza (30cm)",
        icon: "assets/icon/pizza-icon.png"
    },
    {
        name: "salad",
        label: "Salads",
        icon: "assets/icon/salad-icon.png"
    }
];

/* Render menu grouped by category */
categories.forEach(category => {
    /* Insert category header */
    sectionMenu.insertAdjacentHTML(
        "beforeend",
        templateCategoryHeader(category.icon, category.label)
    );

    /* Filter products belonging to this category */
    const filtered = produkte.filter(p => p.category === category.name);

    /* Render all meals inside this category */
    filtered.forEach(product => {
        sectionMenu.insertAdjacentHTML("beforeend", createMealCard(product));
    });
});
