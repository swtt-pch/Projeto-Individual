var express = require("express");
var router = express.Router();

var eventoController = require("../controllers/eventoController");

router.get("/", function (req, res) {
    eventoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    eventoController.listar(req, res);
})

router.get("/detalhar/:idPost", function(req,res) {
    eventoController.detalhar(req, res);
})

router.get("/exibirComentarios/:idPost", function(req,res) {
    eventoController.exibirComentarios(req, res);
})

router.get("/mostrarGostou/:idUsuario,:idPost", function(req,res) {
    eventoController.mostrarGostou(req, res);
})

router.post("/gostei", function(req,res) {
    eventoController.gostei(req, res);
})

router.post("/sgostei", function(req,res) {
    eventoController.sgostei(req, res);
})

router.post("/ngostei", function(req,res) {
    eventoController.ngostei(req, res);
})

module.exports = router;