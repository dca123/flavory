import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/schema.ts",
  connectionString:
    'mysql://npzumqbnyg98ys9x5b3t:pscale_pw_2Tor1ZnZe4CIsrxkKYmM1cYW62ho9a5PJwW7uTFdEer@aws.connect.psdb.cloud/flavory?ssl={"rejectUnauthorized":true}',
} satisfies Config;
