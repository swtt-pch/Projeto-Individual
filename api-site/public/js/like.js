function mostrarGostou(heart, usuario, post) {
    fetch(`/eventos/mostrarGostou/${usuario},${post}`)
        .then(function(resposta){
            if (resposta.status == 204) {
                heart.setAttribute("onclick", `gostei(this,${usuario},${post})`)
                heart.style.background = "url(assets/icon/heartoff.png)"
            } else if(resposta.status == 200){
                resposta.json().then(function(resposta) {
                    if(resposta[0].gostei == 0){
                        heart.setAttribute("onclick", `sgostei(this,${usuario},${post})`)
                        heart.style.background = "url(assets/icon/heartoff.png)"
                    } else if(resposta[0].gostei >= 1) {
                        heart.setAttribute("onclick", `ngostei(this,${usuario},${post})`)
                        heart.style.background = "url(assets/icon/hearton.png)"
                    } else if(resposta[0].gostei == []){
                    }
                }).catch(
                    function(erro){
                        console.log(erro)
                        console.log(resposta)
                    }
                )
            }
        })
}

function gostei(heart, usuario, post) {
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
        resposta.json().then(mostrarGostou(heart, usuario, post)).catch(
            function(erro){
                console.log(erro)
            }
        )
    })
}

function sgostei(heart, usuario, post) {
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
            .then(mostrarGostou(heart, usuario, post)).catch(
                function(erro){
                    console.log(erro)
                }
            )
    })
}

function ngostei(heart, usuario, post) {
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
            mostrarGostou(heart, usuario, post)
        ).catch(
            function(erro){
                console.log(erro)
            }
        )
    })
}
