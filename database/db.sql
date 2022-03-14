-- drop database if exists sql12386553;
-- create database sql12386553;
use sql12386553;

create table users
	(
		acc_id int auto_increment primary key,
		username varchar(255) unique not null,
        email varchar(30) default "I'd Rather Not Say",
		password varchar(255) not null,
		created_at timestamp default now()	
	);
