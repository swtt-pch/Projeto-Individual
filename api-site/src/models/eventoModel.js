var database = require("../database/config");


function detalhar(idPost) {
    var instrucao = `
    select id_post, descricao, e.id_evento, titulo, tipo, cep, numero from post p inner join evento e on p.id_evento = e.id_evento where id_post = '${idPost}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar() {
    var instrucao = `
    select id_post, id_evento from post;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirComentarios(idPost) {
    var instrucao = `
    select nome, quando, comentario from comentario c inner join usuario u on c.id_usuario = u.id_usuario where id_post = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function mostrarGostou(id, post) {
    var instrucao = `
        select * from gostei where id_usuario = ${id} and id_post = ${post};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function inserirGostei(id, post) {
    var instrucao = `
        insert gostei value (${id}, ${post}, true);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updatesGostei(id, post) {
    var instrucao = `
        update gostei set gostei = 1 where id_usuario = ${id} and id_post = ${post};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updatenGostei(id, post) {
    var instrucao = `
        update gostei set gostei = 0 where id_usuario = ${id} and id_post = ${post};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    detalhar,
    exibirComentarios,
    mostrarGostou,
    inserirGostei,
    updatesGostei,
    updatenGostei
}