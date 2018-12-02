create type if not exists payment_status as enum('PENDIENTE', 'CONFIRMADO', 'CANCELADO');

create table if not exists payment (
	transaction_id text primary key,
	status payment_status default 'PENDIENTE' not null,
	currency text not null,
	value integer not null,
	payment_method integer references payment_methods(_id)
);

create table if not exists payment_method (
	transaction_id text primary key references payment(transaction_id),
	expiration_date text not null,
	card_number text not null,
	security_code text not null,
	cardholder_name text not null
)
