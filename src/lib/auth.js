import { betterAuth } from "better-auth";
import dns from "node:dns";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { ROLES } from "@/lib/role-access";

const mongoDnsServers = process.env.MONGO_DNS_SERVERS?.split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (mongoDnsServers?.length) {
  dns.setServers(mongoDnsServers);
}

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: ROLES.TENANT,
      },
    },
  },
});
