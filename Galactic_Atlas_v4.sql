CREATE TABLE "SolarSystems" (
  "system_id" int PRIMARY KEY,
  "name" varchar,
  "image" varchar
);

CREATE TABLE "SolarSystem_Planets" (
  "system_id" integer,
  "planet_id" integer
);

CREATE TABLE "Planets" (
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

CREATE TABLE "Planets_Flora" (
  "planet_id" integer,
  "flora_id" integer
);

CREATE TABLE "Flora" (
  "flora_id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "image" varchar
);

CREATE TABLE "Planets_Fauna" (
  "planet_id" integer,
  "fauna_id" integer
);

CREATE TABLE "Fauna" (
  "fauna_id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "image" varchar
);

ALTER TABLE "SolarSystems" ADD FOREIGN KEY ("system_id") REFERENCES "SolarSystem_Planets" ("system_id");

ALTER TABLE "Planets" ADD FOREIGN KEY ("planet_id") REFERENCES "SolarSystem_Planets" ("planet_id");

ALTER TABLE "Planets" ADD FOREIGN KEY ("planet_id") REFERENCES "Planets_Flora" ("planet_id");

ALTER TABLE "Flora" ADD FOREIGN KEY ("flora_id") REFERENCES "Planets_Flora" ("flora_id");

ALTER TABLE "Planets" ADD FOREIGN KEY ("planet_id") REFERENCES "Planets_Fauna" ("planet_id");

ALTER TABLE "Fauna" ADD FOREIGN KEY ("fauna_id") REFERENCES "Planets_Fauna" ("fauna_id");
