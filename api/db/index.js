import Database from "./Database.js";

const db = new Database();
await db.sync();
export default db;
