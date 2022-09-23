import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { DbHelpersService } from 'src/db-helpers/db-helpers.service';
import { PokemonModel } from 'src/pokemon/entities/pokemon/pokemon.model';
import { Pokemon } from 'src/pokemon/entities/pokemon/pokemon.schema';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly LIMIT = 10;
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: PokemonModel,
    private readonly dbHelpersService: DbHelpersService,
  ) {}

  async populate() {
    await this.pokemonModel.deleteMany({});

    const res = await this.axios.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${this.LIMIT}`,
    );

    const pokemons: Pokemon[] = res.data.results.map((smallPokemon) => {
      const name = smallPokemon.name;
      const [, , , , , , no] = smallPokemon.url.split('/');
      return { name, no: +no };
    });

    for (const pokemon of pokemons) {
      const pokemonDocument = this.pokemonModel.build(pokemon);
      await this.dbHelpersService.save(pokemonDocument);
    }

    return pokemons;
  }
}
