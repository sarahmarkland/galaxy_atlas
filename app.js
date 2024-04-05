const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.static('./'));
const PORT = 3000;

// const pool = new Pool({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'mydb',
//   password: 'password',
//   port: '5432',
// });

// Routes -----------------------------------------------------------------------------------------------------------------------

// Base HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, (error) =>{ 
  if(!error) 
    console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
  else 
    console.log("Error occurred, server can't start", error); 
  }
);