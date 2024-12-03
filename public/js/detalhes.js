
    // Função para trocar a imagem principal ao clicar nas miniaturas
    function trocarImagem(miniaturaId) {
        // A miniatura é passada com um ID como 'imagem1', 'imagem2', etc.
        const index = parseInt(miniaturaId.replace('imagem', '')) - 1; // Extrai o número da miniatura (1, 2, 3, 4)
    
        // Obtém a URL da imagem correspondente ao índice
        const imagemUrl = imagensMiniaturas[produto.id][index];
    
        // Troca a imagem principal pela imagem da miniatura clicada
        const imagemPrincipal = document.getElementById('imagem-principal');
        imagemPrincipal.src = imagemUrl;
    }
    
    
        // Dados dos produtos
        const produtos = [
            {
                id: 1,
                nome: "Notebook Dell",
                preco: 3500.00,
                imagem_url: "https://lojapositivo.vteximg.com.br/arquivos/ids/164830-800-800/POSITIVO_VISION-C14_Ang-1_1000px.jpg?v=638234750124500000",
                descricao: "O Notebook Dell oferece alto desempenho com processador Intel Core i7, 16GB de RAM e 512GB de SSD. Ideal para tarefas intensas e jogos leves. Seu design moderno e leve faz dele uma excelente opção para quem busca qualidade e praticidade."
            },
            {
                id: 2,
                nome: "Smartphone Samsung",
                preco: 2000.00,
                imagem_url: "https://st2.depositphotos.com/1000128/5573/i/450/depositphotos_55735071-stock-photo-modern-touchscreen-smartphones.jpg",
                descricao: "O Smartphone Samsung oferece um excelente equilíbrio entre performance e custo-benefício. Com uma tela de 6,5 polegadas Full HD+, câmera tripla de 48MP e bateria de 5000mAh, é perfeito para quem busca um dispositivo robusto e eficiente."
            },
            {
                id: 3,
                nome: "Cafeteira Philips",
                preco: 250.00,
                imagem_url: "https://t62533.vteximg.com.br/arquivos/ids/280620-1000-1000/cafeteira-mondial-pratic-cn01-20-xicaras-1.jpg?v=638277264847300000",
                descricao: "A Cafeteira Philips é ideal para quem ama café. Com capacidade para até 20 xícaras, ela prepara um café encorpado e saboroso de maneira rápida e prática. Seu design elegante combina com qualquer ambiente da cozinha."
            },
            {
                id: 4,
                nome: "Fone de Ouvido JBL",
                preco: 300.00,
                imagem_url: "https://fastshopbr.vtexassets.com/arquivos/ids/197389/0_JBLT720BTPTO_PRD_1500_1.jpg?v=638588307153530000",
                descricao: "O Fone de Ouvido JBL proporciona uma experiência sonora imersiva com graves profundos e agudos nítidos. Com tecnologia sem fio, design confortável e bateria de longa duração, é perfeito para quem busca qualidade de som durante atividades físicas ou no dia a dia."
            },
            {
                id: 5,
                nome: "Xiaomi Redmi Note 12",
                preco: 1800.00,
                imagem_url: "https://d1sfzvg6s5tf2e.cloudfront.net/Custom/Content/Products/49/49/4949_cel-xiaomi-12-256gb-cx334-azul_z3_638070490742444665.webp",
                descricao: "O Xiaomi Redmi Note 12 é um smartphone de alta performance, com processador Snapdragon 4,8GB de RAM e câmera principal de 50MP. Sua tela AMOLED de 6,67 polegadas oferece uma visualização nítida e vibrante, sendo ideal para quem busca um dispositivo com excelente custo-benefício."
            },
        ];
        
    
        // Miniaturas específicas de cada produto (somente 2 miniaturas agora)
        const imagensMiniaturas = {
            1: [
                "https://lojapositivo.vteximg.com.br/arquivos/ids/164830-800-800/POSITIVO_VISION-C14_Ang-1_1000px.jpg?v=638234750124500000",
                "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/bviayuwn/file.png",
                "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/vlrnpiqd/file.png"
            ],
            2: [
            "https://st2.depositphotos.com/1000128/5573/i/450/depositphotos_55735071-stock-photo-modern-touchscreen-smartphones.jpg",
                "https://a-static.mlcdn.com.br/1500x1500/smartphone-samsung-galaxy-a15-65-256gb-azul-claro-4g-8gb-ram-cam-tripla-50mp-selfie-13mp-5000mah-dual-chip/magazineluiza/237216600/febf6a6164dc08666f77a11eafecbcde.jpg",
                "https://imgs.casasbahia.com.br/55065640/1g.jpg"
            ],
            3: [
                "https://t62533.vteximg.com.br/arquivos/ids/280620-1000-1000/cafeteira-mondial-pratic-cn01-20-xicaras-1.jpg?v=638277264847300000",
                "https://maquinasecafe.com.br/media/catalog/product/5/2/5200series1-c8916f14.webp",
                "https://http2.mlstatic.com/D_NQ_NP_681723-MLU77336193075_062024-O.webp"
            ],
            4: [
                "https://fastshopbr.vtexassets.com/arquivos/ids/197389/0_JBLT720BTPTO_PRD_1500_1.jpg?v=638588307153530000",
                "https://fastshopbr.vtexassets.com/arquivos/ids/495358/0_JBLT520BTPTO_PRD_1500_1.jpg?v=638617860130530000",
                "https://http2.mlstatic.com/D_NQ_NP_912636-MLB49376746079_032022-O.webp"
            ],
            5: [
                "https://d1sfzvg6s5tf2e.cloudfront.net/Custom/Content/Products/49/49/4949_cel-xiaomi-12-256gb-cx334-azul_z3_638070490742444665.webp",
                "https://m.media-amazon.com/images/I/516d7C9LrtL._AC_UF1000,1000_QL80_.jpg",
                "https://m.media-amazon.com/images/I/61KwMD8JAhL.jpg"
            ]
        };
    
        // Captura o ID do produto da URL
        const urlParams = new URLSearchParams(window.location.search);
        const produtoId = urlParams.get('produtoId');
    
        // Busca o produto pelo ID
        const produto = produtos.find(p => p.id == produtoId);
    
        // Exibe os detalhes do produto
        if (produto) {
            document.getElementById('nome-produto').textContent = produto.nome;
            document.getElementById('preco-produto').textContent = `R$ ${produto.preco.toFixed(2)}`;
            document.getElementById('parcelamento-produto').textContent = `10x de R$ ${(produto.preco / 10).toFixed(2)} sem juros`;
            document.getElementById('imagem-principal').src = produto.imagem_url;
            
            // Exibe as duas miniaturas
            document.getElementById('imagem1').src = imagensMiniaturas[produto.id][0];
            document.getElementById('imagem2').src = imagensMiniaturas[produto.id][1];
            document.getElementById('imagem3').src = imagensMiniaturas[produto.id][2];
    
            // Oculta as miniaturas 3 e 4
            document.getElementById('imagem3');
            document.getElementById('imagem4').style.display = "none";
    
            document.getElementById('descricao-produto').textContent = produto.descricao;
        } else {
            document.body.innerHTML = "<p>Produto não encontrado.</p>";
        }
    
        function calcularFrete() {
            const cep = document.getElementById('cep').value.trim();
            const freteResultado = document.getElementById('frete-resultado');
            
            // Valida o formato do CEP (8 dígitos ou 5 dígitos + hífen + 3 dígitos)
            if (!/^\d{5}-?\d{3}$/.test(cep)) {
                freteResultado.textContent = "CEP inválido. Digite um CEP válido no formato 15910-000 ou 15910000.";
                return;
            }
        
            // Exibe mensagem de carregamento
            freteResultado.textContent = "Calculando frete...";
        
            // Simulação de cálculo de frete
            setTimeout(() => {
                const frete = Math.floor(Math.random() * 20) + 10; // Valor fictício entre R$ 10 e R$ 30
                freteResultado.textContent = `Frete para o CEP ${cep}: R$ ${frete.toFixed(2)}`;
            }, 2000);
        }
        
    