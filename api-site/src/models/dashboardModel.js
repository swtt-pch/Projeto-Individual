var database = require("../database/config");

function qtdCurtidas(id) {
    var instrucao = `
        select count(gostei) as qtd from gostei where id_usuario = ${id} and gostei = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function qtdComentarios(id) {
    var instrucao = `
        select count(comentario) as qtd from comentario where id_usuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function maisIndicados() {
    var instrucao = `
        select ti.tipo, sum(ev.tipo) as qtd from indicacao i
        left join evento ev
            on ev.id_evento = i.id_evento
        join tipo ti
            on ev.tipo = ti.id_tipo
        group by ti.id_tipo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    qtdCurtidas,
    qtdComentarios,
    maisIndicados
}