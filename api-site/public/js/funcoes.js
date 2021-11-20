// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var h1Usuario = document.getElementById("h1_usuario");
    var indicacao = document.querySelectorAll(".a_indicacao")
    var visita = document.querySelectorAll(".a_visita")

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        if (h1Usuario != undefined) {
            h1Usuario.innerHTML =`<a href="./eventos.html">EVENTOS</a>`;
        }

        if (indicacao != undefined) {
            indicacao.forEach(a => {
                a.setAttribute("href", "./indicacao.html")
            });
        }

        if (visita != undefined) {
            visita.forEach(a => {
                a.setAttribute("href", "./eventos.html")
            });
        }
        // finalizarAguardar();
    } else {
        return false
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../index.html";
}

// carregamento (loading)
function aguardar() {

    /* old one */
    //var divAguardar = document.getElementById("div_aguardar");
    //divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.innerHTML = texto;
    }
}


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

