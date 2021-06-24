DROP TABLE IF EXISTS "users";

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR(255) NOT NULL,
	"password" VARCHAR(100) NOT NULL,
	"first_name" VARCHAR(100) NOT NULL,
	"last_name" VARCHAR(100) NOT NULL,
	"deleted_at" TIMESTAMP
);

DROP TABLE IF EXISTS "users_info";

CREATE TABLE "users_info" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER NOT NULL UNIQUE,
	"dob" DATE DEFAULT NULL,
	"avatar_url" VARCHAR(255),
	"deleted_at" TIMESTAMP
);

DROP TABLE IF EXISTS "users_roles";

CREATE TABLE "users_roles" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER NOT NULL,
	"role_id" INTEGER NOT NULL,
	"deleted_at" TIMESTAMP
);

DROP TABLE IF EXISTS "roles";

CREATE TABLE "roles" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL UNIQUE,
	"deleted_at" TIMESTAMP
);

DROP TABLE IF EXISTS "endpoints";

CREATE TABLE "endpoints" (
	"id" SERIAL PRIMARY KEY,
	"url" VARCHAR(2048) NOT NULL,
	"deleted_at" TIMESTAMP
);

DROP TABLE IF EXISTS "endpoints_roles";

CREATE TABLE "endpoints_roles" (
	"id" SERIAL PRIMARY KEY,
	"role_id" INTEGER,
	"endpoint_id" INTEGER,
	"permission_mask" INTEGER NOT NULL,
	"deleted_at" TIMESTAMP
);

DROP TABLE IF EXISTS "favorites";

CREATE TABLE "favorites" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER,
	"beer_id" INTEGER,
	"deleted_at" TIMESTAMP
)