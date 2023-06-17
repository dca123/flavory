"use server";
import { db, items } from "db";
import { Schema } from "./page";
import { redirect } from "next/navigation";

// export async function onSubmit() {
export async function onSubmit(data: Schema) {
  const newItem = await db.insert(items).values(data);
  return redirect("/menu");
}
