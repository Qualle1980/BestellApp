let orderBtn = document.getElementById("order_button");
let orderMsg = document.getElementById("order_message");

let mobileOrderBtn = document.getElementById("mobile_order_button");
let mobileOrderMsg = document.getElementById("mobile_order_message");

const showMessage = (box, msg) => {
    box.innerText = msg;
    setTimeout(() => box.innerText = "", 3000);
};

orderBtn.addEventListener("click", () => {
    cart.clear();
    showMessage(orderMsg, "Danke für deine Testbestellung!");
});

mobileOrderBtn.addEventListener("click", () => {
    cart.clear();
    showMessage(mobileOrderMsg, "Danke für deine Testbestellung!");
});
