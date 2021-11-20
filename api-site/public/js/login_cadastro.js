var login = document.querySelector("#login")
var cadastro = document.querySelector("#cadastro");

function cadAcess() {
    document.querySelector("#login").style.marginLeft = "-100%";
    setTimeout(function () {
        document.querySelector("#cadastro").style.marginLeft = "0px";
    }, 1500)
}

function logAcess() {
    document.querySelector("#cadastro").style.marginLeft = "-100%";
    setTimeout(function () {
        document.querySelector("#login").style.marginLeft = "0";
    }, 1500)
}

function entrar() {
    var emailVar = email_entrar.value;
    var senhaVar = senha_entrar.value;

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    // TODO: VERIFICAR AS VALIDAÇÕES QUE ELES ESTÃO APRENDENDO EM ALGORITMOS 
    if (emailVar == "" || senhaVar == "") {
        document.querySelector(".login_erro").innerHTML = "Preencha todos os campos para prosseguir!";
        document.querySelector("#email_entrar").style.borderBottom = "3px solid red"
        document.querySelector("#senha_entrar").style.borderBottom = "3px solid red"
        return false;
    }

    if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".com") == -1) {
        document.querySelector(".login_erro").innerHTML = "Ops, e-mail inválido! Verifique e tente novamente.";
        document.querySelector("#email_entrar").style.borderBottom = "3px solid red"
        return false;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id_usuario;
                document.querySelector(".login_erro").innerHTML = "";
                document.querySelector("#email_entrar").style.borderBottom = "3px solid green"
                document.querySelector("#senha_entrar").style.borderBottom = "3px solid green"        
                setTimeout(function () {
                    window.location = "./index.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            document.querySelector(".login_erro").innerHTML = "Houve um erro ao tentar realizar o login!";

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function cadastrar() {
    var nomeVar = nome_cadastro.value;
    var emailVar = email_cadastro.value;
    var senhaVar = senha_cadastro.value;
    var confirmacaoSenhaVar = confirmacao_senha_cadastro.value;

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
        document.querySelector(".cadastro_erro").innerHTML = "Preencha todos os campos para prosseguir!";
        if (nomeVar == "") {
            document.querySelector("#nome_cadastro").style.borderBottom = "3px solid red"
        } else{
            document.querySelector("#nome_cadastro").style.borderBottom = "3px solid green"
        }
        if (emailVar == "") {
            document.querySelector("#email_cadastro").style.borderBottom = "3px solid red"
        }
        if (senhaVar == "") {
            document.querySelector("#senha_cadastro").style.borderBottom = "3px solid red"
        }
        if (confirmacaoSenhaVar == "") {
            document.querySelector("#confirmacao_senha_cadastro").style.borderBottom = "3px solid red"
        }
        return false;
    }

    document.querySelector("#nome_cadastro").style.borderBottom = "3px solid green"

    if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".com") == -1) {
        document.querySelector(".cadastro_erro").innerHTML = "Ops, e-mail inválido! Verifique e tente novamente.";
        document.querySelector("#email_cadastro").style.borderBottom = "3px solid red"
        return false;
    } else{
        document.querySelector("#email_cadastro").style.borderBottom = "3px solid green"
    }

    if (senhaVar != confirmacaoSenhaVar) {
        document.querySelector(".cadastro_erro").innerHTML = "As senhas inseridas devem ser iguais para prosseguir!";
        document.querySelector("#senha_cadastro").style.borderBottom = "3px solid red"
        document.querySelector("#confirmacao_senha_cadastro").style.borderBottom = "3px solid red"
        return false;
    } else{
        document.querySelector("#senha_cadastro").style.borderBottom = "3px solid green"
        document.querySelector("#confirmacao_senha_cadastro").style.borderBottom = "3px solid green"
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            
            if (resposta.status == 200) {
                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id_usuario;
                    document.querySelector(".background").style.visibility = "visible"
                });

            } else if(resposta.status == 204){
                console.log(JSON.stringify(resposta));
            }
            //logAcess();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}
