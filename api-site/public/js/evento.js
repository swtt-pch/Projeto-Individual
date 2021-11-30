var visitante = sessionStorage.ID_USUARIO

function mostrarGaleria() {
    var idPost = sessionStorage.ID_POST;
    fetch(`/eventos/exibirGaleria/${idPost}`)
        .then(function(resposta){
            if(resposta.status==204) {
                let qtd = document.querySelector(".galeria_imagens")
                qtd.innerHTML = "Nenhuma foto"
            } else if(resposta.status == 200){
                resposta.json()
                .then(function(resposta) {
                    let galeria = document.querySelector(".galeria_imagens")
                    galeria.innerHTML = ""
                    for (let i = 0; i < resposta.length; i++) {
                        let img = document.createElement('img');
                        img.setAttribute('src', `./assets/galeria/${resposta[i].link}`);
                        galeria.appendChild(img);
                    }
                })
            }

        })
}

function comentar(){
    var comentarioVar = document.getElementById("comentario_input").value
    var idVar = sessionStorage.ID_USUARIO
    var postVar = sessionStorage.ID_POST
    fetch("usuarios/comentar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comentarioServer: comentarioVar,
            idServer: idVar,
            postServer: postVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            exibirComentarios()
            let div_button = document.querySelector('.button-box')
            div_button.style.visibility = 'hidden'
        }else {
            throw ("Houve um erro ao tentar comentar");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    document.getElementById("comentario_input").value = ""
}

function exibirDetalhes(){
    var idPost = sessionStorage.ID_POST;
    fetch(`/eventos/detalhar/${idPost}`).then(function(resposta){
        resposta.json().then(function(resposta) {
            document.getElementById('titulo_post').innerHTML = resposta.titulo
            fetch(`https://viacep.com.br/ws/${resposta.cep}/json/`)
            .then(function(resultado) {
                resultado.json()
                .then(function(json){
                    let div = document.getElementById("content-detalhes");
                    console.log(json)
                    let local = json.logradouro +  " - " + json.bairro + ", " + json.localidade + " - " + json.uf + ", " + json.cep;
                    let descricao = resposta.descricao;
                    let tipo = resposta.tipo
                    criarDetalhe(div, local, descricao, tipo);
                })
                .catch(function(error) {
                    console.log(error)
                })
            })

        }).catch(
            function(erro){
                console.log(erro)
            }
        )
    })
    let heart = document.getElementById('heart')

    exibirComentarios();
    mostrarGostou(heart, visitante, idPost, 'big');
    mostrarGaleria();
    todosGostei();
}

function criarDetalhe(div, local, descricao, tipo) {
    let p_local = document.createElement('p')
    p_local.setAttribute('class','post_local');
    let p_desc = document.createElement('p');
    p_desc.setAttribute('class','post_desc');
    let p_tipo = document.createElement('p');
    p_tipo.setAttribute('class', 'post_tipo');
    p_tipo.innerHTML = "Tipo de evento: ";
    let span = document.createElement('span');
    span.setAttribute('id','post_tipo');
    p_tipo.appendChild(span);
    div.appendChild(p_local);
    div.appendChild(p_tipo);
    div.appendChild(p_desc);
    p_local.innerHTML= local
    p_desc.innerHTML = descricao
    span.innerHTML = tipo
}

function exibirComentarios() {
    var idPost = sessionStorage.ID_POST;
    fetch(`/eventos/exibirComentarios/${idPost}`)
        .then(function(resposta){
            if(resposta.status==204) {
                let qtd = document.getElementById("zero_comentarios")
                qtd.innerHTML = "Nenhum comentário :("
            } else if(resposta.status == 200){
                resposta.json()
                .then(function(resposta) {
                    let comentarios = document.getElementById("comentarios")
                    comentarios.innerHTML = ""
                    for (let i = 0; i < resposta.length; i++) {
                        let publicacao = resposta[i]
                        criarComentario(comentarios, publicacao.nome, publicacao.quando, publicacao.comentario)
                    }
                })
            }

        })
        fetch(`/eventos/contarComentarios/${idPost}`)
        .then(function(resposta){
            resposta.json().then(function(resposta) {
                let qtd = document.getElementById("qtd_comentarios")
                qtd.innerHTML = resposta[0].quantos
            }).catch(
                function(erro){
                    console.log(erro)
                }
            )
        }).catch(
        function(erro){
            console.log(erro)
        })
}  

function criarComentario(a,x,y,z){

    let card = document.createElement('div')
    card.setAttribute('class', 'comentario-card')
    let informacoes = document.createElement('div')
    informacoes.setAttribute('class','comentario-informacoes')
    let nome_element = document.createElement('h1')
    let data_element = document.createElement('span')
    let texto_element = document.createElement('p')
    texto_element.setAttribute('class', 'comentario-texto')
    texto_element.setAttribute('id', 'comentario-texto')
    
    informacoes.appendChild(nome_element)
    informacoes.appendChild(data_element)
    card.appendChild(informacoes)
    card.appendChild(texto_element)

    let nome = document.createTextNode(x)
    let data = document.createTextNode(y)
    let texto = document.createTextNode(z)

    nome_element.append(nome)
    data_element.append(data)
    texto_element.append(texto)

    a.appendChild(card)
}

function mostrarGostou(heart, usuario, post, string) {
    let s = string == 'small'?'small':'big';
    fetch(`/eventos/mostrarGostou/${usuario},${post}`)
        .then(function(resposta){
            console.log(resposta)
            if (resposta.status == 204) {
                heart.setAttribute("onclick", `gostei(this,${usuario},${post}, '${s}')`)
                heart.style.background = `url(assets/icon/${s}heartoff.png)`
            } else if(resposta.status == 200){
                resposta.json().then(function(resposta) {
                    if(resposta[0].gostei == 0){
                        heart.setAttribute("onclick", `sgostei(this,${usuario},${post}, '${s}')`)
                        heart.style.background = `url(assets/icon/${s}heartoff.png)`
                    } else if(resposta[0].gostei >= 1) {
                        heart.setAttribute("onclick", `ngostei(this,${usuario},${post}, '${s}')`)
                        heart.style.background = `url(assets/icon/${s}hearton.png)`
                    } else if(resposta[0].gostei == []){
                    }
                    todosGostei();
                }).catch(
                    function(erro){
                        console.log(erro)
                        console.log(resposta)
                    }
                )
            }
        })
}

function todosGostei() {
    let post = sessionStorage.ID_POST

    fetch(`./eventos/todosGostei/${post}`)
        .then(function(resposta) {
            resposta.json().then(j=>{
                document.getElementById('qtd_likes').innerHTML = j.qtd
            })
        })
}

function gostei(heart, usuario, post, string) {
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
        resposta.json().then(mostrarGostou(heart, usuario, post, string)).catch(
            function(erro){
                console.log(erro)
            }
        )
    })
}

function sgostei(heart, usuario, post, string) {
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
            .then(mostrarGostou(heart, usuario, post, string)).catch(
                function(erro){
                    console.log(erro)
                }
            )
    })
}

function ngostei(heart, usuario, post, string) {
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
            mostrarGostou(heart, usuario, post, string)
        ).catch(
            function(erro){
                console.log(erro)
            }
        )
    })
}


