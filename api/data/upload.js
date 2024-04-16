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
  const cleanPlanet = Object.assign({}, planet);
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
  const cleanFlora = Object.assign({}, flora);
  delete cleanFlora['planet'];
  delete cleanFlora['planet_id'];
  return cleanFlora;
});
await MODELS.Flora.bulkCreate(cleanFloraCSV);

// Add fauna
const cleanFaunaCSV = faunaCSV.map((fauna) => {
  const cleanFauna = Object.assign({}, fauna);
  delete cleanFauna['planet'];
  delete cleanFauna['planet_id'];
  return cleanFauna;
});
await MODELS.Fauna.bulkCreate(cleanFaunaCSV);

// console.log(await MODELS.SolarSystems.findAll());
console.log(await MODELS.Planets.findAll());
// console.log(await MODELS.Flora.findAll());
// console.log(await MODELS.Fauna.findAll());
