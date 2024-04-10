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

# Delete the tables
cur.execute("DROP TABLE planets_fauna")
cur.execute("DROP TABLE planets_flora")
cur.execute("DROP TABLE solarsystems_planets")
cur.execute("DROP TABLE flora")
cur.execute("DROP TABLE fauna")
cur.execute("DROP TABLE planets")
cur.execute("DROP TABLE solarsystems")

# Commit the transaction
conn.commit()

# Close the cursor and the connection
cur.close()
conn.close()