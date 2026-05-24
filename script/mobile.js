let mobileCart = document.getElementById("mobile_cart");
let mobileCartButton = document.getElementById("mobile_cart_button");
let mobileCartClose = document.getElementById("mobile_cart_close");

const openMobileCart = () => mobileCart.showModal();
const closeMobileCart = () => mobileCart.close();

mobileCartButton.addEventListener("click", openMobileCart);
mobileCartClose.addEventListener("click", closeMobileCart);

const updateMobileTotal = () => {
    let total = 0;
    cart.items.forEach(i => total += i.price * i.amount);
    total += cart.deliveryFee;
    document.getElementById("mobile_cart_total").innerText = total.toFixed(2) + "€";
};
