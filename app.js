import Express from 'express';
import dbConn from './db_conn.js';
import SolarSystems from './models/SolarSystems.js';

const app = Express();
const PORT = 3000;

await dbConn.sync();

// Routes -----------------------------------------------------------------------------------------------------------------------

// Base HTML
app.get('/', (req, res) => {
  res.send('poob\n');
});

console.log(SolarSystems);

app.listen(PORT, (error) =>{ 
  if(!error)
    console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
  else
    console.log("Error occurred, server can't start", error); 
  }
);
