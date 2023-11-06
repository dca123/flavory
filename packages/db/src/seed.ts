import { db } from './drizzle';
import { items, restaurants } from './schema';
import { faker } from '@faker-js/faker';
import itemData from './seedData/items.json';
import restaurantdata from './seedData/restaurants.json';

async function seedItems() {
  const restaurants = await db.query.restaurants.findMany();
  const newItems = await db.insert(items).values(
    itemData.map((item) => ({
      description: item.description,
      name: item.name,
      price: String(item.price),
      restaurantId: faker.helpers.arrayElement(restaurants).id,
    })),
  );
  console.log(newItems);
}

async function seedRestaurants() {
  const newRestaurants = await db.insert(restaurants).values(restaurantdata);
  console.log(newRestaurants);
}

async function seed() {
  await db.delete(items);
  await db.delete(restaurants);

  await seedRestaurants();
  await seedItems();
}

void seed();
