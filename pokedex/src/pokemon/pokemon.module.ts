import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon/pokemon.schema';
import { DbHelpersModule } from '../db-helpers/db-helpers.module';

@Module({
  controllers: [PokemonController],
  imports: [
    DbHelpersModule,
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
  providers: [PokemonService],
})
export class PokemonModule {}
