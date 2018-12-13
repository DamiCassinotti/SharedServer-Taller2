create table if not exists rules (
	id serial primary key,
	position integer not null,
	description text not null,
	condition text not null,
	type text not null,
	value real not null,
	property text
);

insert into rules (description, position, condition, type, value, property) values
	('Costo por KM', 1, 'delivery.distance > 0', 'multiply', 15, 'distance'),
	('Esta habilitado segun compra minima de 50ARS', 2, 'delivery.ammount < 50', 'qualification', 0, NULL),
	('Descuento de 100ARS en primer viaje', 3, 'delivery.deliveries == 0', 'add', -100, NULL),
	('Envio gratis si email tiene dominio @comprame.com.ar', 4, 'delivery.email =~ /.*@comprame.com.ar$/', 'factor', 0, NULL),
	('No puede solicitar envio si tiene puntaje negativo', 5, 'delivery.points < 0', 'qualification', 0, NULL),
	('Descuento de 5% a partir del 10mo viaje', 6, 'delivery.deliveries >= 10', 'factor', 0.95, NULL);
