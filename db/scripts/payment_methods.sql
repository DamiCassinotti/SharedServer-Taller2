create table if not exists payment_methods (
	name text primary key,
	type integer,
	image text
);

insert into payment_methods ("name", "type", "image") values
	('Efectivo', 0, 'http://soloefectivo.com.ar/image.jpg'),
	('Visa', 1, 'https://firebasestorage.googleapis.com/v0/b/comprameli-49a1b.appspot.com/o/images%2Fpayments%2Fvisa.png?alt=media&token=fed5389f-a966-4f22-82e9-0181784667a7'),
	('American Express', 1, 'https://firebasestorage.googleapis.com/v0/b/comprameli-49a1b.appspot.com/o/images%2Fpayments%2Famex.png?alt=media&token=70c950b6-a60e-4bc3-85ee-fb8cb5d4b82b'),
	('Mastercard', 1, 'https://firebasestorage.googleapis.com/v0/b/comprameli-49a1b.appspot.com/o/images%2Fpayments%2Fmastercard.png?alt=media&token=0deb3fdc-db7b-464a-9f0a-f7c4126808f6');
