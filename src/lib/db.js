// src/lib/db.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_DB_URI;
const dbName = process.env.AUTH_DB_NAME;

if (!uri) {
  throw new Error('Please define the MONGO_DB_URI environment variable');
}
if (!dbName) {
    throw new Error('Please define the AUTH_DB_NAME environment variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);

  await client.connect();

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
