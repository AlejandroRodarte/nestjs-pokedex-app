import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { HealthModule } from './health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DbHelpersModule } from './db-helpers/db-helpers.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL!),
    PokemonModule,
    HealthModule,
    DbHelpersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
