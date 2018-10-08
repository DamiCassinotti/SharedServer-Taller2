create type status as enum('PENDIENTE', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO');

create table if not exists tracking (
	id serial primary key,
	status status default 'PENDIENTE',
	updateAt timestamp default current_timestamp
);

create table if not exists tracking_hist (
	id serial primary key,
	tracking_id integer references tracking(id),
	status status,
	updateAt timestamp
);
