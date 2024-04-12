import psycopg2
import pandas as pd

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

systems = pd.read_csv('data/solar_systems.csv')
planets = pd.read_csv('data/planets.csv')
flora = pd.read_csv('data/flora.csv')
fauna = pd.read_csv('data/fauna.csv')

# Convert integer columns to Python int type
systems['system_id'] = systems['system_id'].astype(int)

for index, row in systems.iterrows():
    cur.execute(
        "INSERT INTO solarsystems (system_id, name, image) VALUES (%s, %s, %s)",
        (row['system_id'], row['name'], row['image'])
    )

planets['planet_id'] = planets['planet_id'].astype(int)
planets['system_id'] = planets['system_id'].astype(int)
planets['temp'] = planets['temp'].astype(int)
planets['mass'] = planets['mass'].astype(int)
planets['moons'] = planets['moons'].astype(int)
planets['distance'] = planets['distance'].astype(int)

for index, row in planets.iterrows():
    cur.execute(
        "INSERT INTO planets (planet_id, name, description, atmosphere, average_temp, mass, moons, distance_from_star, image) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (row['planet_id'], row['name'], row['description'], row['atmosphere'], row['temp'], row['mass'], row['moons'], row['distance'], row['image'])
    )
    cur.execute(
        "INSERT INTO solarsystems_planets (system_id, planet_id) VALUES (%s, %s)",
        (row['system_id'], row['planet_id'])
    )

flora['flora_id'] = flora['flora_id'].astype(int)
flora['planet_id'] = flora['planet_id'].astype(int)

for index, row in flora.iterrows():
    cur.execute(
        "INSERT INTO flora (flora_id, name, description, image) VALUES (%s, %s, %s, %s)",
        (row['flora_id'], row['name'], row['description'], row['image'])
    )
    cur.execute(
        "INSERT INTO planets_flora (planet_id, flora_id) VALUES (%s, %s)",
        (row['planet_id'], row['flora_id'])
    )


fauna['fauna_id'] = fauna['fauna_id'].astype(int)
fauna['planet_id'] = fauna['planet_id'].astype(int)
for index, row in fauna.iterrows():
    cur.execute(
        "INSERT INTO fauna (fauna_id, name, description, image) VALUES (%s, %s, %s, %s)",
        (row['fauna_id'], row['name'], row['description'], row['image'])
    )
    cur.execute(
        "INSERT INTO planets_fauna (planet_id, fauna_id) VALUES (%s, %s)",
        (row['planet_id'], row['fauna_id'])
    )

# Commit the transaction
conn.commit()

# Close the cursor and the connection
cur.close()
conn.close()
