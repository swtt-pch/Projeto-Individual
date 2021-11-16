var database = require("../database/config")

function inserirEvento(nome, tipo, cep, numero) {
    var instrucao = `
    insert into evento(titulo, tipo, cep, numero) value ('${nome}', '${tipo}', '${cep}', '${numero}');
    `;
    return database.executar(instrucao)
}

function inserirIndicacao(usuario, valor, evento) {
    var instrucao = `
    insert into indicacao(id_usuario, valor, id_evento) value (${usuario}, ${valor}, ${evento});
    `;
    return database.executar(instrucao)
}

function retornoEvento(nome, tipo, cep) {
    var instrucao = `
    select * from evento where titulo = '${nome}' and tipo = '${tipo}' and cep = '${cep}'  order by id_evento desc limit 1;
    `;
    return database.executar(instrucao)
}

module.exports = {
    inserirEvento,
    inserirIndicacao,
    retornoEvento
};