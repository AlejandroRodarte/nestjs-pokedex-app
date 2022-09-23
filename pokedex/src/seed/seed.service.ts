import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokemonDocument } from 'src/pokemon/entities/pokemon/pokemon.document';
import { PokemonModel } from 'src/pokemon/entities/pokemon/pokemon.model';
import { Pokemon } from 'src/pokemon/entities/pokemon/pokemon.schema';
import { PokeResponse } from './interfaces/poke-response.interface';
import { HttpAdapter } from 'src/common/interfaces/http-adapter.interface';
import { HTTP_ADAPTER_SEED_SERVICE } from './interfaces/http-adapter.interface.tokens';

@Injectable()
export class SeedService {
  private readonly LIMIT = 650;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: PokemonModel,
    @Inject(HTTP_ADAPTER_SEED_SERVICE) private readonly http: HttpAdapter,
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
