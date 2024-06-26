import psycopg2

# Establish a connection to your PostgreSQL database
conn = psycopg2.connect(
    dbname="galaxy_atlas",
    user="postgres",
    password="password",
    host="127.0.0.1",  # localhost or 127.0.0.1
    port="5432"
)

# Create a cursor object using the connection
cur = conn.cursor()

# Define the CREATE TABLE query
create_table_query = '''
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
'''

# Execute the CREATE TABLE query
cur.execute(create_table_query)

# Commit the transaction
conn.commit()

# Close the cursor and the connection
cur.close()
conn.close()
