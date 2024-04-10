CREATE TABLE "solarsystems" (
  "system_id" integer PRIMARY KEY,
  "name" varchar,
  "image" varchar
);

CREATE TABLE "solarsystems_planets" (
  "system_id" integer,
  "planet_id" integer
);

CREATE TABLE "planets" (
  "planet_id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "atmosphere" varchar,
  "average_temp" float,
  "mass" integer,
  "moons" integer,
  "distance_from_star" float,
  "image" varchar
);

CREATE TABLE "planets_flora" (
  "planet_id" integer,
  "flora_id" integer
);

CREATE TABLE "flora" (
  "flora_id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "image" varchar
);

CREATE TABLE "planets_fauna" (
  "planet_id" integer,
  "fauna_id" integer
);

CREATE TABLE "fauna" (
  "fauna_id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "image" varchar
);

ALTER TABLE "solarsystems_planets" ADD FOREIGN KEY ("system_id") REFERENCES "solarsystems" ("system_id");

ALTER TABLE "solarsystems_planets" ADD FOREIGN KEY ("planet_id") REFERENCES "planets" ("planet_id");

ALTER TABLE "planets_flora" ADD FOREIGN KEY ("planet_id") REFERENCES "planets" ("planet_id");

ALTER TABLE "planets_flora" ADD FOREIGN KEY ("flora_id") REFERENCES "flora" ("flora_id");

ALTER TABLE "planets_fauna" ADD FOREIGN KEY ("planet_id") REFERENCES "planets" ("planet_id");

ALTER TABLE "planets_fauna" ADD FOREIGN KEY ("fauna_id") REFERENCES "fauna" ("fauna_id");
