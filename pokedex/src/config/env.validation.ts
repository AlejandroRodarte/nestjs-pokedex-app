import * as Joi from 'joi';

interface EnvSchemaInterface {
  app: {
    port: Joi.NumberSchema;
  };
  environment: Joi.StringSchema;
  database: {
    url: Joi.StringSchema;
  };
  seed: {
    api: Joi.StringSchema;
    limit: Joi.NumberSchema;
  };
}

const mongoUriRegex =
  /^mongodb:\/\/(?:(?:(\w+)?:(\w+)?@)|:?@?)((?:[\w.-])+)(?::(\d+))?(?:\/([\w-]+))?(?:\?([\w-]+=[\w-]+(?:&[\w-]+=[\w-]+)*)?)?$/;

const appPortSchema = Joi.number().required();
const environmentSchema = Joi.string()
  .required()
  .valid(
    'development',
    'development-docker',
    'production',
    'production-docker',
  );
const databaseUrlSchema = Joi.string().required().regex(mongoUriRegex);
const seedApiSchema = Joi.string().required().uri();
const seedLimitSchema = Joi.number().optional();

export const EnvSchema = Joi.object<EnvSchemaInterface>().keys({
  app: {
    port: appPortSchema,
  },
  environment: environmentSchema,
  database: {
    url: databaseUrlSchema,
  },
  seed: {
    api: seedApiSchema,
    limit: seedLimitSchema,
  },
});
