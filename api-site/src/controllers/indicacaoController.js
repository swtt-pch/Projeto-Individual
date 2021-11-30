var indicacaoModel = require("../models/indicacaoModel");

function testar(req, res) {
    console.log("ENTRAMOS NO indicacaoController");
    res.send("ENTRAMOS NO indicacaoCONTROLLER");
}


function inserir(req,res){
    var nome = req.body.nome
    var valor = req.body.valor;
    if (valor == undefined || valor == "" || valor == null) {
        valor = 0.0
    }
    valor = valor.toString().replace(",", ".")
    var tipo = req.body.tipo
    var cep = req.body.cep
    var numero = req.body.numero
    var usuario = req.params.idUsuario

    if(nome == undefined){
        res.status(400).send("Nome é undefined")
    } else if(tipo == undefined){
        res.status(400).send("Tipo é undefined")
    } else if(cep == undefined){
        res.status(400).send("Cep é undefined")
    } else if(numero == undefined){
        res.status(400).send("Numero é undefined")
    } else if(usuario == undefined){
        res.status(403).send("O id do usuário está indefinido!");
    }
    else{
        indicacaoModel.inserirEvento(nome, tipo, cep, numero)
        .then( function(){
            indicacaoModel.retornoEvento(nome, tipo, cep)
                .then(function(resposta){
                    let evento = resposta[0].id_evento
                    indicacaoModel.inserirIndicacao(usuario, valor, evento)
                        .then(function(resposta){
                                res.status(200).json(resposta);
                        }).catch(function(erro){
                            console.log(erro)
                            res.status(404)
                        })  
                }).catch(function (erro) {
                    console.log(erro)
                })
        }).catch(
            function(erro) {
                console.log(erro)
                console.log("erro ao inserir evento");
                res.status(500).json(erro.sqlMessage);
            }    
        );

    }
}

module.exports = {
    inserir,
    testar
}