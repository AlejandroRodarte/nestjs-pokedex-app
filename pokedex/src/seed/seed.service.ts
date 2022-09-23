import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokemonDocument } from 'src/pokemon/entities/pokemon/pokemon.document';
import { PokemonModel } from 'src/pokemon/entities/pokemon/pokemon.model';
import { Pokemon } from 'src/pokemon/entities/pokemon/pokemon.schema';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  private readonly LIMIT = 650;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: PokemonModel,
    private readonly http: AxiosAdapter,
  ) {}

  async populate(): Promise<string> {
    await this.pokemonModel.deleteMany({});

    const [data] = await this.http.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${this.LIMIT}`,
    );

    const pokemonDocuments: PokemonDocument[] = data.results.map(
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
