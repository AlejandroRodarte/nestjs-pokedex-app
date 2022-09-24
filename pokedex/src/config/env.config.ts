import { EnvSchema } from './env.validation';

export default () => {
  const env = {
    app: {
      port: +process.env.PORT,
    },
    environment: process.env.NODE_ENV,
    database: {
      url: process.env.MONGODB_URL,
    },
    seed: {
      api: process.env.POKEMON_SEED_API,
      limit: +process.env.POKEMON_SEED_LIMIT || 30,
    },
  };

  const validationResults = EnvSchema.validate(env, { abortEarly: false });

  if (!validationResults.error) return env;
  throw new Error(
    `
      Some errors were found in your environment variables.
      Please fix them:
      ${JSON.stringify(validationResults.error.details, undefined, 2)}
    `,
  );
};
