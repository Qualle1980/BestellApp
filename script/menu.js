let menuList = document.getElementById("menu_list");
let categoryButtons = document.querySelectorAll("#menu_categories button");

let currentCategory = "burger";

const loadMenu = category => {
    currentCategory = category;
    menuList.innerHTML = "";
    dishes[category].forEach(dish => menuList.innerHTML += menuTemplate(dish));
};

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        loadMenu(btn.dataset.cat);
    });
});

document.addEventListener("click", e => {
    if (e.target.classList.contains("add_btn")) {
        addToCart(e.target.dataset.id);
    }
});

loadMenu("burger");
