"use server";
import { db } from "@/lib/drizzle";
import { items } from "@/lib/schema";
import { Schema } from "./page";
import { redirect } from "next/navigation";

// export async function onSubmit() {
export async function onSubmit(data: Schema) {
  const newItem = await db.insert(items).values(data);
  return redirect("/menu");
}
