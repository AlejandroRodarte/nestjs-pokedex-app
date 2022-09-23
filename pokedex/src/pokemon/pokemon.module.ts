import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon/pokemon.schema';
import { DbHelpersModule } from '../db-helpers/db-helpers.module';

const DynamicMongooseModule = MongooseModule.forFeature([
  { name: Pokemon.name, schema: PokemonSchema },
]);

@Module({
  controllers: [PokemonController],
  exports: [DynamicMongooseModule],
  imports: [DbHelpersModule, DynamicMongooseModule],
  providers: [PokemonService],
})
export class PokemonModule {}
