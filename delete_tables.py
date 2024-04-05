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

# Delete the tables
cur.execute("DROP TABLE Solar_Systems")
cur.execute("DROP TABLE Planets")
cur.execute("DROP TABLE Flora")
cur.execute("DROP TABLE Fauna")

# Commit the transaction
conn.commit()

# Close the cursor and the connection
cur.close()
conn.close()