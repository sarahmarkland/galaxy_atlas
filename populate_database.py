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
'''

# Execute the CREATE TABLE query
cur.execute(create_table_query)

# Commit the transaction
conn.commit()

# Close the cursor and the connection
cur.close()
conn.close()
