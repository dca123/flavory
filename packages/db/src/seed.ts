import { db } from "./drizzle";
import { items, restaurants } from "./schema";
import { faker } from "@faker-js/faker";
import itemData from "./seedData/items.json";

async function seedItems() {
  const restaurants = await db.query.restaurants.findMany();
  const newItems = await db.insert(items).values(
    itemData.map((item) => ({
      ...item,
      restaurantId: faker.helpers.arrayElement(restaurants).id,
    }))
  );
  console.log(newItems);
}

async function seedRestaurants() {
  const newRestaurants = await db.insert(restaurants).values([
    {
      name: "The Tasty Bistro",
      description:
        "A cozy bistro offering a variety of delicious dishes made with fresh, locally sourced ingredients.",
    },
    {
      name: "Spice Palace",
      description:
        "Experience the exotic flavors of the East at Spice Palace, where our skilled chefs prepare authentic dishes from India, Thailand, and beyond.",
    },
    {
      name: "Mamma Mia Pizzeria",
      description:
        "Serving up mouthwatering pizzas with thin, crispy crusts, topped with the finest ingredients and melted cheese that will make you say 'Mamma Mia!'",
    },
    {
      name: "The Seafood Shack",
      description:
        "Indulge in a delectable array of fresh seafood dishes, from succulent grilled fish to creamy seafood pasta, all served in a charming seaside setting.",
    },
    {
      name: "Green Leaf Cafe",
      description:
        "At Green Leaf Cafe, we are passionate about serving wholesome, plant-based meals that are as nourishing for the body as they are delicious.",
    },
    {
      name: "Rustic BBQ Joint",
      description:
        "Satisfy your cravings for smoky, finger-licking barbecue at our rustic joint, where we slow-cook our meats to perfection and serve them with savory homemade sauces.",
    },
    {
      name: "Café Mornings",
      description:
        "Start your day right with a visit to Café Mornings, where we brew the finest coffee and serve a delightful selection of freshly baked pastries and breakfast classics.",
    },
    {
      name: "The Sushi Spot",
      description:
        "Experience the art of sushi-making at The Sushi Spot, where our skilled sushi chefs craft delicate rolls and sashimi using the freshest fish and ingredients.",
    },
    {
      name: "La Dolce Vita",
      description:
        "Indulge in the sweet life at La Dolce Vita, where we serve authentic Italian gelato, pastries, and desserts that will transport you to the streets of Rome.",
    },
    {
      name: "Fusion Flavors",
      description:
        "Embark on a culinary journey at Fusion Flavors, where we combine the best of various cuisines to create unique and mouthwatering fusion dishes.",
    },
  ]);
  console.log(newRestaurants);
}

async function seed() {
  await db.delete(items);
  await db.delete(restaurants);

  await seedRestaurants();
  await seedItems();
}

void seed();
