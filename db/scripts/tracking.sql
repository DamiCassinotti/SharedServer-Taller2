create table tracking (
	id serial primary key,
	status text,
	updateAt timestamp default current_date
);
