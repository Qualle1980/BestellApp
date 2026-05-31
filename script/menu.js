/* render category header outside layout */

import { produkte } from "./data.js";
import { templateCategoryHeader, createMealCard, templateBasket } from "./templates.js";

document.getElementById("basketWrapper").innerHTML = templateBasket();

document.getElementById("categoryHeaderContainer").innerHTML =
    templateCategoryHeader("assets/icon/burger-icon.png", "Burger & Sandwiches");

const sectionMenu = document.getElementById("sectionMenu");

produkte.forEach(product => {
    sectionMenu.insertAdjacentHTML("beforeend", createMealCard(product));
});
