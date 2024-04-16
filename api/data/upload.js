import { parse } from 'csv-parse/sync';
import fs from 'node:fs/promises';
import db from '../db/index.js';
import * as MODELS from '../db/models/index.js';

async function getData(filename) {
  const textData = (await fs.readFile(`./data/${filename}`)).toString();
  return parse(textData, {
    columns: true,
    skip_empty_lines: true,
    cast: true
  });
}

const solarSystemCSV = await getData('solar_systems.csv');
const planetsCSV = await getData('planets.csv');
const floraCSV = await getData('flora.csv');
const faunaCSV = await getData('fauna.csv');

// Add solar systems
await MODELS.SolarSystems.bulkCreate(solarSystemCSV);

// Add planets
const cleanPlanetsCSV = planetsCSV.map((planet) => {
  const cleanPlanet = { ...planet };
  // Make csv object align with db model
  cleanPlanet.average_temp = planet.temp;
  cleanPlanet.distance_from_star = planet.distance;
  delete cleanPlanet['system'];
  delete cleanPlanet['system_id'];
  delete cleanPlanet['temp'];
  delete cleanPlanet['distance'];
  return cleanPlanet;
});
await MODELS.Planets.bulkCreate(cleanPlanetsCSV);

// Add flora
const cleanFloraCSV = floraCSV.map((flora) => {
  const cleanFlora = { ...flora };
  delete cleanFlora['planet'];
  delete cleanFlora['planet_id'];
  return cleanFlora;
});
await MODELS.Flora.bulkCreate(cleanFloraCSV);

// Add fauna
const cleanFaunaCSV = faunaCSV.map((fauna) => {
  const cleanFauna = { ...fauna };
  delete cleanFauna['planet'];
  delete cleanFauna['planet_id'];
  return cleanFauna;
});
await MODELS.Fauna.bulkCreate(cleanFaunaCSV);

// Add SolarSystems_Planets junction
const junction_SolarSystems_Planets = planetsCSV.map((planet) => {
  return {
    'system_id': planet.system_id,
    'planet_id': planet.planet_id
  }
});
await MODELS.SolarSystems_Planets.bulkCreate(junction_SolarSystems_Planets);

// Add Planets_Flora junction
const junction_Planets_Flora = floraCSV.map((flora) => {
  return {
    'planet_id': flora.planet_id,
    'flora_id': flora.flora_id
  }
});
await MODELS.Planets_Flora.bulkCreate(junction_Planets_Flora);

const junction_Planets_Fauna = faunaCSV.map((fauna) => {
  return {
    'planet_id': fauna.planet_id,
    'fauna_id': fauna.fauna_id
  }
});
await MODELS.Planets_Fauna.bulkCreate(junction_Planets_Fauna);

const dataCheck = {
  'SolarSystems': await MODELS.SolarSystems.findAll(),
  'Planets': await MODELS.Planets.findAll(),
  'Flora': await MODELS.Flora.findAll(),
  'Fauna': await MODELS.Flora.findAll(),
  'SolarSystems_Planets': await MODELS.SolarSystems_Planets.findAll(),
  'Planets_Flora': await MODELS.Planets_Flora.findAll(),
  'Planets_Fauna': await MODELS.Planets_Fauna.findAll(),
}

let totalAdded = 0;
for (const d in dataCheck) {
  console.log(`Added ${dataCheck[d].length} ${d}.`);
  totalAdded += dataCheck[d].length;
}
console.log(`Added ${totalAdded} records in total.`);
await db.close();
