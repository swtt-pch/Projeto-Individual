var express = require("express");
var router = express.Router();

var indicacaoController = require("../controllers/indicacaoController");

router.get("/", function (req, res) {
    indicacaoController.testar(req, res);
});

router.post("/inserir/:idUsuario", function (req, res) {
    indicacaoController.inserir(req, res);
});



module.exports = router;