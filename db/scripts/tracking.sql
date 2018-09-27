create table tracking (
	id serial primary key,
	status status default 'PENDIENTE',
	updateAt timestamp default current_date
);
