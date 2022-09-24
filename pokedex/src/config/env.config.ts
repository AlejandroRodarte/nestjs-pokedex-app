export default () => ({
  app: {
    port: +process.env.PORT,
  },
  environment: process.env.NODE_ENV,
  database: {
    url: process.env.MONGODB_URL,
  },
  seed: {
    api: process.env.POKEMON_SEED_API,
    limit: +process.env.POKEMON_SEED_LIMIT,
  },
});
