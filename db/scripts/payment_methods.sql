create table if not exists payment_methods (
	_id serial primary key,
	name text,
	type integer,
	image text
);

insert into payment_methods ("name", "type", "image") values
	('Efectivo', 0, 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-11/256/Cash-icon.png'),
	('VISA Crédito', 1, 'https://cdn1.iconfinder.com/data/icons/credit-card-icons/512/visa.png'),
	('VISA Débito', 1, 'http://downloadicons.net/sites/default/files/visa-icon-65187.png'),
	('AMEX', 1, 'https://cdn2.iconfinder.com/data/icons/credit-cards-6/156/american_express-512.png')
