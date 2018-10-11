create type payment_status as enum('PENDIENTE', 'CONFIRMADO', 'CANCELADO');

create table if not exists payment (
	transaction_id text primary key,
	status payment_status default 'PENDIENTE' not null,
	currency text not null,
	value integer not null,
	payment_method text not null
);

create table if not exists payment_method (
	transaction_id text primary key references payment(transaction_id),
	expiration_month text not null,
	expiration_year text not null,
	number text not null
)
