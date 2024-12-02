const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const Stripe = require('stripe');
const { OAuth2Client } = require('google-auth-library');
const path = require('path');

// Inicializar o Stripe com sua chave secreta
const stripe = Stripe('sk_test_51QDOmoHkxHLashFy55RFxo2mL2rtoerTwmNlEAHlXzgIKnqkL27DzQjH2Wg9B4gDcGtUixjhV1PjV6wvkWlPposO00BxUtGmP3');

// Configuração do cliente OAuth do Google
const CLIENT_ID = '76113149783-absumgsmgsjf4hg99fq966p29a56aofq.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Variável para armazenar o estado do usuário logado
let loggedUser = null;

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

// Endpoint para autenticação com o Google
app.post('/auth/google', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, // Especifica o CLIENT_ID
        });

        const payload = ticket.getPayload();
        
        // Armazenar as informações do usuário
        loggedUser = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
        };

        // Retorna as informações do usuário autenticado
        res.status(200).json({
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
        });
    } catch (error) {
        console.error('Erro na verificação do token do Google:', error);
        res.status(400).json({ error: 'Erro ao autenticar com o Google.' });
    }
});

// Endpoint para mostrar as informações do usuário logado
app.get('/user', (req, res) => {
    if (loggedUser) {
        res.json(loggedUser);
    } else {
        res.status(401).json({ error: 'Usuário não autenticado' });
    }
});

// Rota para servir as páginas de sucesso e cancelamento
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
