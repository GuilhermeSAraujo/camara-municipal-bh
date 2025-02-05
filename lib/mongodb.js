import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let db;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    client = new MongoClient(uri, options);
    global._mongoClient = client.connect().then(() => client.db("camara-bh"));
  }
  db = await global._mongoClient;
} else {
  client = new MongoClient(uri, options);
  db = await client.connect().then(() => client.db("camara-bh"));
}

export default db;
