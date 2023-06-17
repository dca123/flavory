import { db } from "./drizzle";
import { items, restaurants } from "./schema";

async function seedItems() {
  const newItems = await db.insert(items).values([
    {
      name: "Classic Cheeseburger",
      description:
        "A juicy beef patty topped with melted cheddar cheese, served on a toasted bun with lettuce, tomato, and pickles.",
      price: 10.99,
    },
    {
      name: "Margherita Pizza",
      description:
        "Thin crust pizza topped with fresh tomatoes, mozzarella cheese, and basil leaves, drizzled with olive oil.",
      price: 12.99,
    },
    {
      name: "Grilled Chicken Caesar Salad",
      description:
        "Grilled chicken breast on a bed of crisp romaine lettuce, tossed with creamy Caesar dressing, croutons, and Parmesan cheese.",
      price: 9.99,
    },
    {
      name: "Penne Pasta Alfredo",
      description:
        "Penne pasta tossed in a creamy Alfredo sauce, garnished with Parmesan cheese and fresh parsley.",
      price: 11.99,
    },
    {
      name: "BBQ Ribs",
      description:
        "Tender and succulent pork ribs slathered in a tangy BBQ sauce, served with coleslaw and fries.",
      price: 15.99,
    },
    {
      name: "Vegetarian Pad Thai",
      description:
        "Stir-fried rice noodles with tofu, bean sprouts, carrots, bell peppers, and peanuts, in a flavorful Pad Thai sauce.",
      price: 10.99,
    },
    {
      name: "Fish and Chips",
      description:
        "Crispy beer-battered fish fillets served with golden fries, tartar sauce, and a side of coleslaw.",
      price: 13.99,
    },
    {
      name: "Spinach and Feta Stuffed Chicken Breast",
      description:
        "Grilled chicken breast stuffed with sautéed spinach and creamy feta cheese, served with roasted potatoes and seasonal vegetables.",
      price: 14.99,
    },
    {
      name: "Beef Tacos",
      description:
        "Soft corn tortillas filled with seasoned ground beef, topped with shredded lettuce, diced tomatoes, cheese, and salsa.",
      price: 8.99,
    },
    {
      name: "Chocolate Lava Cake",
      description:
        "Warm, gooey chocolate cake with a molten chocolate center, served with a scoop of vanilla ice cream.",
      price: 6.99,
    },
  ]);
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

  await seedItems();
  await seedRestaurants();
}

void seed();
