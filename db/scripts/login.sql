create table if not exists usuario (
	username text primary key,
	password text not null
);

insert into usuario ("username", "password") values ('administrator', 'password'), ('pgotuzzo', 'password'), ('dcassinotti', 'password')
