create database db;
use db;

create table usuarios (
	id int auto_increment primary key ,
    nome varchar(250) not null,
    email varchar(250) not null,
    senha varchar (250) not null
);

select * from usuarios;