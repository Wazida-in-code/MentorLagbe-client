import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);
const db = client.db('MentorLagbe');

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  }, 
  // Extra user fields we store in MongoDB (on top of name/email/image).
  user: {
    additionalFields: {
      role: {
        // "admin" is part of the model, but never given out on public sign-up
        // (see the database hook below).
        type: ["student", "tutor", "admin"],
        input: true, // the sign-up form may send it
        defaultValue: "student",
      },
      plan: {
        type: ["free", "pro"],
        input: false,
        defaultValue: "free",
      },
      phone: {
        type: "string",
        required: false, // optional, not part of sign-up
        input: true,
      },
      bio: {
        type: "string",
        required: false, // optional, not part of sign-up
        input: true,
      },
    },
  },
  
  database: mongodbAdapter(db, {
    client,
  }),
});
