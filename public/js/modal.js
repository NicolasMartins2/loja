// Funções relacionadas à exibição e controle do modal do carrinho
function renderCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = '';
    const cart = getCartItems();

    cart.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('cart-item');
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>Preço: R$ ${item.price}</p>
                <p>Quantidade: <span id="quantity-${item.id}">${item.quantity}</span></p>
            </div>
            <div class="cart-item-actions">
                <button class="increase-quantity" data-id="${item.id}">+</button>
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                <button class="remove-item" data-id="${item.id}">Remover</button>
            </div>
        `;
        cartItemsList.appendChild(itemCard);
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const productId = this.dataset.id;
            increaseQuantity(productId);
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const productId = this.dataset.id;
            decreaseQuantity(productId);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const productId = this.dataset.id;
            removeFromCart(productId);
        });
    });
}

document.getElementById('cart-icon').addEventListener('click', function(event) {
    const cartModal = document.getElementById('cart-modal');
    renderCartItems();
    cartModal.style.display = 'flex';
    event.stopPropagation();
});

document.getElementById('close-cart-modal').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cart-modal');
    const cartIcon = document.getElementById('cart-icon');

    if (!cartModal.contains(event.target) && !cartIcon.contains(event.target)) {
        cartModal.style.display = 'none';
    }
});
