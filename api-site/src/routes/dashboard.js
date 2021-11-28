var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/", function (req, res) {
    dashboardController.testar(req, res);
});

router.get("/maisIndicados", function (req, res) {
    dashboardController.maisIndicados(req,res);
})

router.get(`/qtdCurtidas/:idUsuario`, function(req, res) {
    dashboardController.qtdCurtidas(req, res);
})

router.get(`/qtdComentarios/:idUsuario`, function(req, res) {
    dashboardController.qtdComentarios(req, res);
})

module.exports = router;