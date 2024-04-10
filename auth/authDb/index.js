import AuthDatabase from "./AuthDatabase.js";
const authDb = new AuthDatabase();
await authDb.sync();
export default authDb;