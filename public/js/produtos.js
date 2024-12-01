// Funções relacionadas à exibição e manipulação dos produtos
function fetchProducts() {
    fetch('/produtos')
        .then(response => response.json())
        .then(produtos => {
            renderProducts(produtos);
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
}

function renderProducts(produtos) {
    const produtosLista = document.getElementById('produtos-lista');
    produtosLista.innerHTML = '';

    produtos.forEach(produto => {
        const produtoCard = document.createElement('div');
        produtoCard.classList.add('produto-card');
        produtoCard.innerHTML = `
            <img src="${produto.imagem_url}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>Preço: R$ ${produto.preco}</p>
            <p>Quantidade: ${produto.quantidade}</p>
            <button class="add-to-cart" 
                    data-product-id="${produto.id}" 
                    data-product-name="${produto.nome}" 
                    data-product-price="${produto.preco}" 
                    data-product-image="${produto.imagem_url}">
                Adicionar ao Carrinho
            </button>
        `;
        produtosLista.appendChild(produtoCard);
    });

    setupAddToCartButtons();
}

function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                id: this.dataset.productId,
                name: this.dataset.productName,
                price: parseFloat(this.dataset.productPrice),
                image: this.dataset.productImage
            };
            addToCart(product);
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    fetchProducts();
});
