import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { DbHelpersService } from 'src/db-helpers/db-helpers.service';
import { PokemonDocument } from 'src/pokemon/entities/pokemon/pokemon.document';
import { PokemonModel } from 'src/pokemon/entities/pokemon/pokemon.model';
import { Pokemon } from 'src/pokemon/entities/pokemon/pokemon.schema';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly LIMIT = 650;
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: PokemonModel,
  ) {}

  async populate(): Promise<string> {
    await this.pokemonModel.deleteMany({});

    const res = await this.axios.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${this.LIMIT}`,
    );

    const pokemonDocuments: PokemonDocument[] = res.data.results.map(
      (smallPokemon) => {
        const name = smallPokemon.name;
        const [, , , , , , no] = smallPokemon.url.split('/');
        const pokemon = { name, no: +no };
        return this.pokemonModel.build(pokemon);
      },
    );

    await this.pokemonModel.insertMany(pokemonDocuments);
    return `Seed executed. ${this.LIMIT} records saved to the database.`;
  }
}
