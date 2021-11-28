var dashboardModel = require("../models/dashboardModel");

function testar(req, res) {
    console.log("ENTRAMOS NO dashboardController");
    res.send("ENTRAMOS NO dashboardCONTROLLER");
}

function maisIndicados(req, res) {
    dashboardModel.maisIndicados()
        .then(function(resposta) {
            res.status(200).json(resposta)
        }).catch(erro=>{
            console.log(erro)
            res.status(500).send("Deu erro!")
        })
}

function qtdCurtidas(req, res) {
    var id = req.params.idUsuario
    dashboardModel.qtdCurtidas(id)
        .then(function(resposta) {
            res.status(200).json(resposta[0])
        }).catch(erro=>{
            console.log(erro)
            res.status(500).send("Deu erro!")
        })
}

function qtdComentarios(req, res) {
    var id = req.params.idUsuario
    dashboardModel.qtdComentarios(id)
        .then(function(resposta) {
            res.status(200).json(resposta[0])
        }).catch(erro=>{
            console.log(erro)
            res.status(500).send("Deu erro!")
        })
}

module.exports = {
    testar,
    maisIndicados,
    qtdCurtidas,
    qtdComentarios
}