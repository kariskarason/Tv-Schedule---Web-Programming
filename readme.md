�a� sem �arf a� gera:

gera npm install, eftir a� mappa verkefnisins hefur veri� valin.

Gera database sem heitir data � localhost, 
fara � schedule.js og setja notandanafn og password � sta� postgres:postgres (notandanafn:password) � l�nu 14
fara � routes.js og setja notandanafn og password � sta� postgres:postgres (notandanafn:password) � l�nu 15

� data skal gera tv�r t�flur, showsTest og channelsTest, me� eftirfarandi h�tti:

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

Ef �a� er eitthva� vesen, endilega hafa samband � email: ksk12@hi.is, s: 847-4386
