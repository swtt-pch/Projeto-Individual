// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var nav_bar = document.getElementById("nav_bar_list");
    var h1Usuario = document.getElementById("h1_usuario");
    var indicacao = document.querySelectorAll(".a_indicacao")
    var visita = document.querySelectorAll(".a_visita")
    var sair = document.createElement("li")
    var link = document.createElement("a")
    link.setAttribute('href', 'index.html')
    link.setAttribute('onclick', 'limparSessao()')
    link.innerHTML = "SAIR";
    sair.appendChild(link)

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

        nav_bar.appendChild(sair)
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

function buscarDados(x) {
    fetch(`https://viacep.com.br/ws/${x}/json/`)
    .then(function(resultado) {
        resultado.json()
        .then(function(json){
            console.log(json)
            document.getElementById('logradouro_input').value = json.logradouro
            document.getElementById('bairro_input').value = json.bairro
            document.getElementById('cidade_input').value = json.localidade
            document.getElementById('uf_input').value = json.uf
        })
        .catch(function(error) {
            console.log(error)
        })
    })
}