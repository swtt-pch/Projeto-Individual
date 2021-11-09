create database db_visitei;

use db_visitei;

create table usuario(
	id_usuario int auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null, 
    senha varchar(30) not null, 
    primary key(id_usuario)
);

create table evento(
	id_evento int auto_increment,
    titulo varchar(80) not null,
    tipo varchar(30) not null, 
    quando date not null,
    cep char(8) not null, 
    numero varchar(4),
    primary key (id_evento)
);

create table indicacao(
	id_indicacao int auto_increment,
    id_usuario int not null, 
    id_evento int not null,
    primary key (id_indicacao),
    constraint fk_usuario_indicacao foreign key (id_usuario) references usuario(id_usuario),
    constraint fk_evento_indicacao foreign key(id_evento) references evento(id_evento) on update cascade on delete cascade
);

create table post(
	id_post int auto_increment,
    descricao text,
    id_evento int not null, 
    primary key(id_post),
    constraint fk_evento_post foreign key(id_evento) references evento(id_evento) on update cascade on delete cascade
);

create table comentario(
	id_comentario int auto_increment,
    comentario varchar(200) not null,
    quando timestamp default current_timestamp,
    id_usuario int not null,
    id_post int not null,
    primary key(id_comentario),
    constraint fk_usuario_comentario foreign key(id_usuario) references usuario(id_usuario)on update cascade on delete cascade,
    constraint fk_post_comentario foreign key(id_post) references post(id_post)on update cascade on delete cascade
);

create table gostei(
	id_usuario int,
    id_post int, 
    gostei binary,
    primary key(id_usuario, id_post),
    constraint fk_usuario_gostei foreign key(id_usuario) references usuario(id_usuario) on update cascade on delete cascade, 
    constraint fk_post_gostei foreign key(id_post) references post(id_post) on update cascade on delete cascade
);


