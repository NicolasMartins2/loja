// Função que é chamada quando o login é bem-sucedido
function handleCredentialResponse(response) {
    try {
        // Decodificando o JWT para acessar as informações do usuário
        const data = jwt_decode(response.credential);
        console.log(data);

        // Verifica se o elemento existe antes de tentar modificar o conteúdo
        const accountTextElement = document.getElementById('account-text');
        const googleSignInButton = document.getElementById('google-signin-button');
        const logoutButton = document.getElementById('logout-button');
        
        // Atualiza o texto do "Minha conta"
        if (accountTextElement) {
            accountTextElement.innerHTML = `Olá ${data.name}`;
            accountTextElement.classList.remove('hidden');  // Torna visível após o login
        }

        // Esconde o botão de login
        if (googleSignInButton) {
            googleSignInButton.style.display = 'none';  // Esconde o botão de login
        }

        // Exibe o botão de logout
        if (logoutButton) {
            logoutButton.classList.remove('hidden');  // Torna o botão de logout visível
        }

        // Enviar o token para o backend para validação
        fetch('/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: response.credential }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Usuário autenticado:', data);
        })
        .catch(error => {
            console.error('Erro ao autenticar com o Google:', error);
        });

    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
    }
}

// Inicializa a autenticação do Google ao carregar a página
window.onload = function() {
    google.accounts.id.initialize({
        client_id: '76113149783-absumgsmgsjf4hg99fq966p29a56aofq.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
    );
}

// Função para fazer logout
function logout() {
    // Limpar o token do Google (o usuário será desconectado)
    google.accounts.id.disableAutoSelect();

    // Esconde o texto "Olá [nome]" e o botão de logout
    const accountTextElement = document.getElementById('account-text');
    const logoutButton = document.getElementById('logout-button');
    const googleSignInButton = document.getElementById('google-signin-button');
    
    if (accountTextElement) {
        accountTextElement.classList.add('hidden');
    }

    if (logoutButton) {
        logoutButton.classList.add('hidden');
    }

    // Exibe o botão de login novamente
    if (googleSignInButton) {
        googleSignInButton.style.display = 'block';
    }
}
