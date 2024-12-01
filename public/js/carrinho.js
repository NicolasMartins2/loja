// Funções relacionadas ao carrinho (adicionar, remover, atualizar e persistência)
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCartItems(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCartItems();
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function addToCart(product) {
    const cart = getCartItems();
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    saveCartItems(cart);
    updateCartCount();
}

function removeFromCart(productId) {
    let cart = getCartItems();
    cart = cart.filter(item => item.id !== productId);
    saveCartItems(cart);
    updateCartCount();
    renderCartItems();
}

function decreaseQuantity(productId) {
    let cart = getCartItems();
    const product = cart.find(item => item.id === productId);

    if (product && product.quantity > 1) {
        product.quantity -= 1;
        saveCartItems(cart);
        renderCartItems();
        updateCartCount();
    }
}

function increaseQuantity(productId) {
    let cart = getCartItems();
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += 1;
        saveCartItems(cart);
        renderCartItems();
        updateCartCount();
    }
}
