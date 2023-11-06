import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/schema.ts',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  driver: 'mysql2',
} satisfies Config;
