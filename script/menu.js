import { produkte } from "./data.js";
import { templateCategoryHeader, createMealCard, templateBasket } from "./templates.js";

/* Render basket container */
document.getElementById("basketWrapper").innerHTML = templateBasket();

/* Cart icon belongs in the mobile footer nav */
document
    .getElementById("mobileNav")
    .appendChild(document.getElementById("mobileBasketBtn"));

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
for (let c = 0; c < categories.length; c++) {
    const category = categories[c];

    sectionMenu.insertAdjacentHTML(
        "beforeend",
        templateCategoryHeader(category.icon, category.label)
    );

    for (let p = 0; p < produkte.length; p++) {
        if (produkte[p].category === category.name) {
            sectionMenu.insertAdjacentHTML(
                "beforeend",
                createMealCard(produkte[p])
            );
        }
    }
}
