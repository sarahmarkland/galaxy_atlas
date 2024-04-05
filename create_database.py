import psycopg2

# Establish a connection to your PostgreSQL database
conn = psycopg2.connect(
    dbname="mydb",
    user="postgres",
    password="password",
    host="127.0.0.1",  # localhost or 127.0.0.1
    port="5432"
)

# Create a cursor object using the connection
cur = conn.cursor()

# Define the CREATE TABLE query
create_table_query = '''
CREATE TABLE "Solar_Systems" (
  "system_id" int PRIMARY KEY,
  "name" varchar,
  "planets" varchar,
  "image" varchar
);

CREATE TABLE "Planets" (
  "planet_id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "atmosphere" varchar,
  "average_temp" varchar,
  "mass" integer,
  "moons" integer,
  "distance_from_star" integer,
  "flora" varchar,
  "fauna" varchar,
  "image" varchar
);

CREATE TABLE "Flora" (
  "flora_id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "planet" varchar,
  "environment" varchar,
  "life_span" varchar,
  "image" varchar
);

CREATE TABLE "Fauna" (
  "fauna_id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "planet" varchar,
  "environment" varchar,
  "diet" varchar,
  "behavior" varchar,
  "predators" varchar,
  "lifespan" varchar,
  "image" varchar
);

ALTER TABLE "Planets" ADD FOREIGN KEY ("planet_id") REFERENCES "Solar_Systems" ("planets");

ALTER TABLE "Flora" ADD FOREIGN KEY ("flora_id") REFERENCES "Planets" ("flora");

ALTER TABLE "Fauna" ADD FOREIGN KEY ("fauna_id") REFERENCES "Planets" ("fauna");
'''

# Execute the CREATE TABLE query
cur.execute(create_table_query)

# Commit the transaction
conn.commit()

# Close the cursor and the connection
cur.close()
conn.close()
