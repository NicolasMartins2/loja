const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const Stripe = require('stripe');

// Inicializar o Stripe com sua chave secreta
const stripe = Stripe('sk_test_51QDOmoHkxHLashFy55RFxo2mL2rtoerTwmNlEAHlXzgIKnqkL27DzQjH2Wg9B4gDcGtUixjhV1PjV6wvkWlPposO00BxUtGmP3');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json()); // Permite processar requisições com corpo JSON

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loja',
});

// Testar conexão
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Endpoint para listar os produtos
app.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM produtos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err.message);
            res.status(500).json({ error: 'Erro ao buscar produtos.' });
            return;
        }
        res.json(results);
    });
});

// Endpoint para criar uma sessão de checkout no Stripe
app.post('/create-checkout-session', async (req, res) => {
    try {
        const cartItems = req.body; // Produtos enviados pelo frontend

        // Verificar se o carrinho está vazio
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'Carrinho vazio.' });
        }

        // Mapear itens do carrinho para o formato do Stripe
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'brl',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: Math.round(item.price * 100), // Stripe usa centavos
            },
            quantity: item.quantity,
        }));

        // Criar uma sessão de checkout no Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/sucesso.html', // URL após sucesso
            cancel_url: 'http://localhost:3000/cancelamento.html', // URL após cancelamento
        });

        res.json({ url: session.url }); // Retornar a URL do checkout
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error.message);
        res.status(500).json({ error: 'Erro ao criar sessão de checkout.' });
    }
});

// Servindo as páginas de sucesso e cancelamento
app.get('/sucesso.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'sucesso.html'));
});

app.get('/cancelamento.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'cancelamento.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
