// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var nav_bar = document.getElementById("nav_bar_list");
    var h1Usuario = document.getElementById("h1_usuario");
    var welcome = document.getElementById('welcome')
    var text = document.getElementById('welcome-text')
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

        if (welcome && text) {
            welcome.innerHTML = `Bem vindo, ${nome}!`
            text.innerHTML = `Agora que você já tem acesso, você poderá tanto ver minhas postagens, quando me indicar lugares para ir!<br>
            Sinta-se a vontade para ver os eventos que fui no botão abaixo:`
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

function buscarDados(x) {
    var info = document.getElementById('informations');
    var local = document.querySelectorAll('.input-local');
    if (x == '' || x.length<8) {
        info.style.display = "block"
        info.innerHTML = "Informe um CEP válido"
        info.style.color = "red"
        turnRed(document.getElementById('cep_input'))
        document.getElementById('logradouro_input').value = ""
        document.getElementById('bairro_input').value = ""
        document.getElementById('cidade_input').value = ""
        document.getElementById('uf_input').value = ""
        return
    }

    fetch(`https://viacep.com.br/ws/${x}/json/`)
    .then(function(resultado) {
        resultado.json()
        .then(function(json){
            if (json.logradouro == undefined) {
                info.style.display = "block"
                info.innerHTML = "O CEP informado não existe..."
                info.style.color = "red"
                turnRed(document.getElementById('cep_input'))
            } else{
                info.style.display = "none"
                turnGreen(document.getElementById('cep_input'))
                document.getElementById('logradouro_input').value = json.logradouro
                document.getElementById('bairro_input').value = json.bairro
                document.getElementById('cidade_input').value = json.localidade
                document.getElementById('uf_input').value = json.uf
                local.forEach(input => {
                    input.setAttribute("disabled", "disabled")
                });
            }
        })
        .catch(function(error) {
            console.log(error)
        })
    })
}

function checkName(x) {
    if (x.value == "") {
        turnRed(x)
    } if (x.value.length>0) {
        turnGreen(x)
    }
}

function turnGreen(x) {
    x.style = "border-bottom: 2px solid green;"
}

function turnRed(x) {
    x.style = "border-bottom: 2px solid red;"
}
