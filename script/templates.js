const menuTemplate = dish => {
    return `
        <div class="menu_item">
            <img src="${dish.img}" class="menu_img">
            <div class="menu_info">
                <h3>${dish.name}</h3>
                <p>${dish.price.toFixed(2)}€</p>
            </div>
            <button class="add_btn" data-id="${dish.id}">+</button>
        </div>
    `;
};

const cartItemTemplate = item => {
    return `
        <div class="cart_item">
            <div class="cart_line">
                <span>${item.name}</span>
                <span>${(item.price * item.amount).toFixed(2)}€</span>
            </div>
            <div class="cart_controls">
                <button onclick="cart.change('${item.id}', -1)">-</button>
                <span>${item.amount}</span>
                <button onclick="cart.change('${item.id}', 1)">+</button>
            </div>
        </div>
    `;
};

const totalsTemplate = (subtotal, delivery, total) => {
    return `
        <p>Zwischensumme: ${subtotal.toFixed(2)}€</p>
        <p>Liefergebühr: ${delivery.toFixed(2)}€</p>
        <h3>Total: ${total.toFixed(2)}€</h3>
    `;
};
