import * as Joi from 'joi';

interface EnvSchemaInterface {
  NODE_ENV: Joi.StringSchema;
  MONGODB_URL: Joi.StringSchema;
  PORT: Joi.NumberSchema;
  POKEMON_SEED_API: Joi.StringSchema;
  POKEMON_SEED_LIMIT: Joi.NumberSchema;
}

const mongoUriRegex =
  /^mongodb:\/\/(?:(?:(\w+)?:(\w+)?@)|:?@?)((?:[\w.-])+)(?::(\d+))?(?:\/([\w-]+))?(?:\?([\w-]+=[\w-]+(?:&[\w-]+=[\w-]+)*)?)?$/;

const nodeEnvSchema = Joi.string()
  .required()
  .valid(
    'development',
    'development-docker',
    'production',
    'production-docker',
    'production-heroku',
  );
const mongoDbUrlSchema = Joi.string().required().regex(mongoUriRegex);
const appPortSchema = Joi.number().default(3000);
const pokemonSeedApiSchema = Joi.string().required().uri();
const pokemonSeedLimitSchema = Joi.number().default(30);

export const EnvSchema = Joi.object<EnvSchemaInterface>().keys({
  NODE_ENV: nodeEnvSchema,
  MONGODB_URL: mongoDbUrlSchema,
  PORT: appPortSchema,
  POKEMON_SEED_API: pokemonSeedApiSchema,
  POKEMON_SEED_LIMIT: pokemonSeedLimitSchema,
});
