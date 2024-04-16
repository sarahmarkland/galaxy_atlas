import { parse } from 'csv-parse/sync';
import fs from 'node:fs/promises';
import db from '../db/index.js';
import * as MODELS from '../db/models/index.js';

async function getData(filename) {
  const textData = (await fs.readFile(`./data/${filename}`)).toString();
  return parse(textData, {
    columns: true,
    skip_empty_lines: true,
  });
}

console.log(await getData('solar_systems.csv'));
console.log(await getData('planets.csv'));
console.log(await getData('flora.csv'));
console.log(await getData('fauna.csv'));
