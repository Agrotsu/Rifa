// Mostra o spinner de carregamento
function showSpinner() {
    document.getElementById("spinner").style.display = "flex";
}

// Esconde o spinner de carregamento
function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
}

// Login com conexão ao backend
async function login() {
    //clearMessage("loginMsg");
    const username = document.getElementById("inpUsuario").value.trim();
    const password = document.getElementById("inpSenha").value.trim();

    if (!username || !password) {
        //showMessage("loginMsg", "Por favor, preencha os campos de usuário e senha.", "error");
        alert("Por favor, preencha os campos de usuário e senha.");
        return;
    }

    showSpinner();

    try {
        // const response = await fetch('/api/login', {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ username, password })
        // });
        
        hideSpinner();

        // if (!response.ok) {
        //     const data = await response.json();
        //     showMessage("loginMsg", data.message || "Verifique suas credenciais.", "error");
        //     return;
        // }

        // Login sucedido: exibe mensagem de sucesso e redireciona
        //showMessage("loginMsg", "Login realizado com sucesso!", "success");
        setTimeout(() => {
            window.location.href = "home.html";
        }, 1000);
    } catch (error) {
        hideSpinner();
        //showMessage("loginMsg", "Erro no login: " + error.message, "error");
    }
}