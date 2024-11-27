  // Função para formatar o preço
  function formatPrice(price) {
    return parseFloat(price).toFixed(2).replace('.', ',');
}

// Função para abrir o carrinho
document.getElementById('cart-icon').addEventListener('click', () => {
    const cartContainer = document.getElementById('cart-container-popup');
    cartContainer.style.display = cartContainer.style.display === 'block' ? 'none' : 'block';
});

// Adicionar ao carrinho
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Atualizar os itens no carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="name">${item.nome}</div>
            <div class="price">R$ ${formatPrice(item.preco)}</div>
        `;
        cartItems.appendChild(div);
    });

    cartCount.textContent = cart.length;
}

// Limpar o carrinho
function clearCart() {
    localStorage.removeItem('cart');
    updateCart();
}

// Finalizar a compra
function checkout() {
    alert('Compra finalizada!');
    clearCart();
}

// Carregar os produtos da API
fetch('/produtos')
    .then(response => response.json())
    .then(produtos => {
        const container = document.getElementById('products-container');
        
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${produto.imagem_url}" alt="${produto.nome}">
                <div class="card-body">
                    <h3 class="card-title">${produto.nome}</h3>
                    <p class="card-text">Categoria: ${produto.categoria}</p>
                    <p class="card-text">Quantidade: ${produto.quantidade}</p>
                    <p class="price">R$ ${formatPrice(produto.preco)}</p>
                    <button class="btn" onclick='addToCart(${JSON.stringify(produto)})'>Adicionar ao Carrinho</button>
                </div>
            `;
            container.appendChild(card);
        });

        updateCart(); // Atualizar carrinho quando a página for carregada
    })
    .catch(error => {
        console.error('Erro ao carregar produtos:', error);
        const container = document.getElementById('products-container');
        container.innerHTML = '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>';
    });