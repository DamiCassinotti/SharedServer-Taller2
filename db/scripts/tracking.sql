create type status as enum('PENDIENTE', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO');

create table tracking (
	id serial primary key,
	status status default 'PENDIENTE',
	updateAt timestamp default current_timestamp
);
