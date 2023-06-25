"use server";
import { db, users } from "db";
import { Schema } from "./page";

export async function createUser(args: Schema) {
  const newUser = await db.insert(users).values({
    email: args.email,
    passwordHash: args.password,
  });
}
