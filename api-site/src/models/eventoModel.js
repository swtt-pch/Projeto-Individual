var database = require("../database/config");


function detalhar(idPost) {
    var instrucao = `
    select id_post, descricao, e.id_evento as "id_evento", titulo, t.tipo as tipo, cep, numero from post p inner join evento e on p.id_evento = e.id_evento inner join tipo t on t.id_tipo = e.tipo where id_post = '${idPost}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar() {
    var instrucao = `
    select thumbnail, p.id_post, e.id_evento, titulo from post p join evento e on p.id_evento = e.id_evento;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirComentarios(idPost) {
    var instrucao = `
    select nome, date_format(date(quando), "%d/%m/%Y") as quando, comentario from comentario c inner join usuario u on c.id_usuario = u.id_usuario where id_post = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function exibirGaleria(idPost) {
    var instrucao = `
    select link from galeria where id_post = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function contarComentarios(idPost) {
    var instrucao = `
    select count(id_comentario) as quantos from comentario where id_post = ${idPost};
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

function todosGostei(post) {
    var instrucao = `
        select sum(gostei) as qtd from gostei where id_post = ${post};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function inserirGostei(id, post) {
    var instrucao = `
        insert gostei value (${id}, ${post}, 1, now());
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

function mostrarMaisIndicados() {
    var instrucao = `
        select ti.tipo as tipo, count(ev.tipo) as qtd from indicacao i
        left join evento ev
            on ev.id_evento = i.id_evento
        join tipo ti
            on ev.tipo = ti.id_tipo
        group by ti.id_tipo;
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    detalhar,
    exibirComentarios,
    mostrarGostou,
    inserirGostei,
    updatesGostei,
    updatenGostei,
    contarComentarios,
    exibirGaleria,
    mostrarMaisIndicados,
    todosGostei
}