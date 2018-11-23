create table if not exists requests (
	"url" text not null,
	"method" text not null,
	"statusCode" integer not null,
	"elapsedTime" integer not null
);
