import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { DbHelpersModule } from '../db-helpers/db-helpers.module';

@Module({
  controllers: [SeedController],
  imports: [DbHelpersModule, PokemonModule],
  providers: [SeedService],
})
export class SeedModule {}
