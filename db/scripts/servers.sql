create table if not exists server (
	id serial primary key,
	_rev text default 0,
	createdBy text,
	createdTime timestamp default current_timestamp,
	name text,
	lastConnection timestamp
);

alter table server alter column _rev type integer using (_rev::integer);
