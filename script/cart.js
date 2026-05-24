class Cart {
    constructor() {
        this.items = [];
        this.deliveryFee = 4.99;
    }

    add(id) {
        const dish = this.findDish(id);
        const existing = this.items.find(i => i.id === id);
        existing ? existing.amount++ : this.items.push({ id: dish.id, name: dish.name, price: dish.price, amount: 1 });
        this.update();
    }

    findDish(id) {
        return Object.values(dishes).flat().find(d => d.id === id);
    }

    change(id, value) {
        const item = this.items.find(i => i.id === id);
        item.amount += value;
        if (item.amount <= 0) this.items = this.items.filter(i => i.id !== id);
        this.update();
    }

    update() {
        this.render();
        this.renderMobile();
        updateMobileTotal();
    }

    render() {
        const box = document.getElementById("cart_content");
        box.innerHTML = "";
        if (this.items.length === 0) return box.innerHTML = "<p>Füge etwas Leckeres hinzu</p><div id='separator'></div>";

        let subtotal = 0;
        this.items.forEach(i => { subtotal += i.price * i.amount; box.innerHTML += cartItemTemplate(i); });

        const total = subtotal + this.deliveryFee;
        box.innerHTML += totalsTemplate(subtotal, this.deliveryFee, total);
    }

    renderMobile() {
        const box = document.getElementById("mobile_cart_content");
        box.innerHTML = "";
        if (this.items.length === 0) return box.innerHTML = "<p>Füge etwas Leckeres hinzu</p><div id='separator'></div>";

        let subtotal = 0;
        this.items.forEach(i => { subtotal += i.price * i.amount; box.innerHTML += cartItemTemplate(i); });

        const total = subtotal + this.deliveryFee;
        box.innerHTML += totalsTemplate(subtotal, this.deliveryFee, total);
    }

    clear() {
        this.items = [];
        this.update();
    }
}

const cart = new Cart();
const addToCart = id => cart.add(id);
