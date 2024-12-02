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

     // Adicionando o botão "Finalizar Compra"
     const checkoutButton = document.createElement('button');
     checkoutButton.id = 'checkout-button';
     checkoutButton.textContent = 'Finalizar Compra';
     checkoutButton.classList.add('checkout-button');
     cartItemsList.appendChild(checkoutButton);
 
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
 
     // Listener para "Finalizar Compra"
     checkoutButton.addEventListener('click', () => redirectToCheckout());
 }

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
//

//
async function redirectToCheckout() {
    const cart = getCartItems();
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    try {
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart),
        });

        const session = await response.json();
        if (session.url) {
            window.location.href = session.url; // Redireciona para o Stripe
        } else {
            alert('Erro ao redirecionar para o pagamento.');
        }
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error);
        alert('Ocorreu um erro ao tentar finalizar a compra.');
    }
}
//

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
