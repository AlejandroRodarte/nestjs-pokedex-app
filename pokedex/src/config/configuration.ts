export default () => ({
  seed: {
    api: process.env.POKEMON_SEED_API,
    limit: process.env.POKEMON_SEED_LIMIT,
  },
});
