var eventoModel = require("../models/eventoModel");

function testar(req, res) {
    console.log("ENTRAMOS NO indicacaoController");
    res.send("ENTRAMOS NO indicacaoCONTROLLER");
}


function listar(req,res) {
    eventoModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os gosteis: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function detalhar(req, res) {
    var idPost = req.params.idPost
    if(idPost == undefined){
        res.status(400).send("o id do post é undefined")
    }
    eventoModel.detalhar(idPost).then(function (resultado) {
        if (resultado.length == 1) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function contarComentarios(req, res) {
    var idPost = req.params.idPost
    if(idPost == undefined){
        res.status(400).send("o id do post é undefined")
    }else{
        eventoModel.contarComentarios(idPost).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function exibirComentarios(req, res) {
    var idPost = req.params.idPost
    if(idPost == undefined){
        res.status(400).send("o id do post é undefined")
    }else{
        eventoModel.exibirComentarios(idPost).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function exibirGaleria(req, res) {
    var idPost = req.params.idPost
    if(idPost == undefined){
        res.status(400).send("o id do post é undefined")
    }else{
        eventoModel.exibirGaleria(idPost).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function mostrarGostou(req, res) {
    var id = req.params.idUsuario
    var post = req.params.idPost
    if(id == undefined){
        res.status(400).send("o id do usuario é undefined")
    } else if(post == undefined){
        res.status(400).send("o id do post é undefined")
    } else{
        eventoModel.mostrarGostou(id, post).then(function (resultado) {
            if (resultado.length == 1) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function gostei(req, res) {
    var id = req.body.idUsuario
    var post = req.body.idPost
    if(id == undefined){
        res.status(400).send("o id do usuario é undefined")
    } else if(post == undefined){
        res.status(400).send("o id do post é undefined")
    } else {
        eventoModel.inserirGostei(id, post).then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            console.log("Erro ao inserrir e Atualizar")
            res.status(500).json(erro.sqlMessage)
        });
    }
}

function ngostei(req, res) {
    var id = req.body.idUsuario
    var post = req.body.idPost
    if(id == undefined){
        res.status(400).send("o id do usuario é undefined")
    } else if(post == undefined){
        res.status(400).send("o id do post é undefined")
    } else {
        eventoModel.updatenGostei(id, post).then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            console.log("Erro ao inserrir e Atualizar")
            res.status(500).json(erro.sqlMessage)
        });
    }
}

function sgostei(req, res) {
    var id = req.body.idUsuario
    var post = req.body.idPost
    if(id == undefined){
        res.status(400).send("o id do usuario é undefined")
    } else if(post == undefined){
        res.status(400).send("o id do post é undefined")
    } else {
        eventoModel.updatesGostei(id, post).then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            console.log("Erro ao inserrir e Atualizar")
            res.status(500).json(erro.sqlMessage)
        });
    }
}

module.exports = {
    testar,
    listar,
    detalhar,
    exibirComentarios,
    mostrarGostou,
    gostei,
    ngostei,
    sgostei,
    contarComentarios,
    exibirGaleria
}