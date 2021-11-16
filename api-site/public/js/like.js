function mostrarGostou() {
    var usuario = sessionStorage.ID_USUARIO;
    var post = sessionStorage.ID_POST;
    fetch(`/eventos/mostrarGostou/${usuario},${post}`).then(function(resposta){
        resposta.json().then(function(resposta) {
            if(resposta[0].gostei == 0){
                document.getElementById("coracao-like").setAttribute("onclick", "sgostei()")
                document.getElementById("coracao-like").style.backgroundColor = "red"
            } else if(resposta[0].gostei >= 1) {
                document.getElementById("coracao-like").setAttribute("onclick", "ngostei()")
                document.getElementById("coracao-like").style.backgroundColor = "blue"
            } else if(resposta[0].gostei == []){
                document.getElementById("coracao-like").setAttribute("onclick", "gostei()")
                document.getElementById("coracao-like").style.backgroundColor = "red"
            }
        }).catch(
            function(erro){
                console.log(erro)
            }
        )
    })
}

function gostei() {
    var usuario = sessionStorage.ID_USUARIO;
    var post = sessionStorage.ID_POST;
    fetch("/eventos/gostei", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: usuario,
            idPost: post
        })
    }).then(function(resposta){
        resposta.json().then(mostrarGostou()).catch(
            function(erro){
                console.log(erro)
            }
        )
    })
}

function sgostei() {
    var usuario = sessionStorage.ID_USUARIO;
    var post = sessionStorage.ID_POST;
    fetch("/eventos/sgostei", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: usuario,
            idPost: post
        })
    }).then(function(resposta){
        resposta.json()
            .then(mostrarGostou()).catch(
                function(erro){
                    console.log(erro)
                }
            )
    })
}

function ngostei() {
    var usuario = sessionStorage.ID_USUARIO;
    var post = sessionStorage.ID_POST;
    fetch("/eventos/ngostei", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: usuario,
            idPost: post
        })
    }).then(function(resposta){
        resposta.json().then(
            mostrarGostou()
        ).catch(
            function(erro){
                console.log(erro)
            }
        )
    })
}
