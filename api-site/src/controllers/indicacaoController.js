var indicacaoModel = require("../models/indicacaoModel");

function testar(req, res) {
    console.log("ENTRAMOS NO indicacaoController");
    res.send("ENTRAMOS NO indicacaoCONTROLLER");
}


function inserir(req,res){

    var nome = req.body.nome
    var valor = req.body.valor;
    var tipo = req.body.tipo
    var cep = req.body.cep
    var numero = req.body.numero
    var usuario = req.params.idUsuario
    console.log(valor)
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
        .then( function(resposta) {
            console.log(resposta);
            indicacaoModel.retornoEvento(nome, tipo, cep)
            .then(function (resposta){
                let evento = resposta[0].id_evento
                console.log(evento);
                if (valor == undefined) {
                    valor = 0.0
                }
                indicacaoModel.inserirIndicacao(usuario, valor, evento)
                    .then(function(resultado){
                        res.status(200).json(resultado);
                    }).catch(
                        function(erro){
                            console.log(erro)
                            res.status(500).json(erro.sqlMessage);
                        }
                    )
            }).catch(
                function(erro) {
                    console.log(erro)
                    console.log("erro ao consultar evento");
                    res.status(500).json(erro.sqlMessage);
                }
            )}
        ).catch(
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