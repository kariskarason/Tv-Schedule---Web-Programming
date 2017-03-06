Það sem þarf að gera:

gera npm install, eftir að mappa verkefnisins hefur verið valin.

Gera database sem heitir data á localhost, 
fara í schedule.js og setja notandanafn og password í stað postgres:postgres (notandanafn:password) í línu 14
fara í routes.js og setja notandanafn og password í stað postgres:postgres (notandanafn:password) í línu 15

í data skal gera tvær töflur, showsTest og channelsTest, með eftirfarandi hætti:

CREATE TABLE channelsTest(
  	id serial primary key,
	name varchar(100) default 'Nafnlaus',
  	channel varchar(100) not null,
  	grade int CHECK (grade >=0 AND grade <=5),
  	comment varchar(1000),
date timestamp with time zone not null default current_timestamp
);

CREATE TABLE showsTest(
	id serial primary key,
	name varchar(100) default 'Nafnlaus',
	show varchar(100) not null,
	channel varchar(100) not null,
  	grade int CHECK (grade >=0 AND grade <=5) default null,
  	comment varchar(1000),
date timestamp with time zone not null default current_timestamp
);

Ef það er eitthvað vesen, endilega hafa samband í email: ksk12@hi.is, s: 847-4386
