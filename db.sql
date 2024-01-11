create database phonebookproject;

use phonebookproject;

create table global(
    id int primary key auto_increment,
    name varchar(30) not null,
    mobno varchar(10) not null unique,
    spam_count int not null default 0
);

create table users(
    id int primary key auto_increment,
    name varchar(30) not null,
    mobno varchar(10) not null unique,
    email varchar(30),
    password varchar(50) not null
);

create table incontact(
    user_id int,
    global_id int,
    constraint fk_incontact_userId foreign key(user_id) references users(id),
    constraint fk_incontact_globalId foreign key(global_id) references global(id)
);

ALTER TABLE incontact
ADD CONSTRAINT uc_user_global UNIQUE (user_id, global_id);