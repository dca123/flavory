"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { onSubmit } from "./action";
import { useTransition } from "react";

const Schema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  price: z.number().min(0.01).max(999.99),
});
export type Schema = z.infer<typeof Schema>;

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<Schema>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      description: "",
      price: "" as unknown as number,
    },
  });

  const handleSubmit = (data: Schema) => startTransition(() => onSubmit(data));

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-16">
      <h1 className="text-6xl font-bold text-center">Add Item to Menu</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Item</FormLabel>
                <FormControl>
                  <Input placeholder="Your delicious food name" {...field} />
                </FormControl>
                <FormDescription>
                  This will be the name of your food item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your delicious food description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will be the description of your food item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your delicious food price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  This will be the price of your food item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isPending ? "Saving ..." : "Create Item"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
