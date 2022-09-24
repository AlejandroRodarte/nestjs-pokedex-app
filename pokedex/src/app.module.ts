import { join } from 'path';
import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { HealthModule } from './health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DbHelpersModule } from './db-helpers/db-helpers.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import configuration from './config/configuration';

const configModuleOptions: ConfigModuleOptions = {
  load: [configuration],
  isGlobal: true,
};

if (!['development-docker', 'production-docker'].includes(process.env.NODE_ENV))
  configModuleOptions.envFilePath = `env/.env.${process.env.NODE_ENV}`;

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL!),
    PokemonModule,
    HealthModule,
    DbHelpersModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
