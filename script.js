// Mostra o spinner de carregamento
function showSpinner() {
    document.getElementById("spinner").style.display = "flex";
}

// Esconde o spinner de carregamento
function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
}

// Exibe uma mensagem amigável em um container específico
function showMessage(containerId, message, type = 'error') {
    const container = document.getElementById(containerId);
    container.textContent = message;
    container.classList.remove('error', 'success');
    container.classList.add(type);
}

// Limpa a mensagem do container especificado
function clearMessage(containerId) {
    const container = document.getElementById(containerId);
    container.textContent = "";
    container.classList.remove('error', 'success');
}

// Login com conexão ao backend
async function login() {
    clearMessage("loginMsg");
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        showMessage("loginMsg", "Por favor, preencha os campos de usuário e senha.", "error");
        return;
    }

    showSpinner();

    try {
        const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
        });
        
        hideSpinner();

        if (!response.ok) {
        const data = await response.json();
        showMessage("loginMsg", data.message || "Verifique suas credenciais.", "error");
        return;
        }

        // Login sucedido: exibe mensagem de sucesso e redireciona
        showMessage("loginMsg", "Login realizado com sucesso!", "success");
        setTimeout(() => {
        window.location.href = "home.html";
        }, 1000);
    } catch (error) {
        hideSpinner();
        showMessage("loginMsg", "Erro no login: " + error.message, "error");
    }
}

// Cadastro com conexão ao backend
async function register() {
    clearMessage("registerMsg");
    const nome = document.getElementById("nome").value.trim();
    const loginUser = document.getElementById("loginUser").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmSenha = document.getElementById("confirmSenha").value;

    if (!nome || !loginUser || !senha || !confirmSenha) {
        showMessage("registerMsg", "Por favor, preencha todos os campos de cadastro.", "error");
        return;
    }

    if (senha !== confirmSenha) {
        showMessage("registerMsg", "As senhas não conferem!", "error");
        return;
    }

    showSpinner();

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, login: loginUser, senha })
        });
        
        hideSpinner();

        if (!response.ok) {
            const data = await response.json();
            showMessage("registerMsg", data.message || "Erro ao cadastrar usuário.", "error");
            return;
        }

        await response.json();
            showMessage("registerMsg", `Usuário ${nome} cadastrado com sucesso!`, "success");
            setTimeout(() => {
            closeRegister();
        }, 1000);
    } catch (error) {
        hideSpinner();
        showMessage("registerMsg", "Erro no cadastro: " + error.message, "error");
    }
}

// Abre o modal de cadastro
function openRegister() {
    clearMessage("registerMsg");
    document.getElementById("registerModal").classList.add("active");
}

// Fecha o modal de cadastro
function closeRegister() {
    clearMessage("registerMsg");
    document.getElementById("registerModal").classList.remove("active");
}