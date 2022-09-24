import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokemonDocument } from 'src/pokemon/entities/pokemon/pokemon.document';
import { PokemonModel } from 'src/pokemon/entities/pokemon/pokemon.model';
import { Pokemon } from 'src/pokemon/entities/pokemon/pokemon.schema';
import { PokeResponse } from './interfaces/poke-response.interface';
import { HttpAdapter } from 'src/common/interfaces/http-adapter.interface';
import { HTTP_ADAPTER_SEED_SERVICE } from './interfaces/http-adapter.interface.tokens';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: PokemonModel,
    @Inject(HTTP_ADAPTER_SEED_SERVICE) private readonly http: HttpAdapter,
    private readonly configService: ConfigService,
  ) {}

  async populate(): Promise<string> {
    const api = this.configService.get<string>('seed.api');
    const limit = this.configService.get<number>('seed.limit');

    await this.pokemonModel.deleteMany({});

    const [data] = await this.http.get<PokeResponse>(`${api}?limit=${limit}`);

    const pokemonDocuments: PokemonDocument[] = data.results.map(
      (smallPokemon) => {
        const name = smallPokemon.name;
        const [, , , , , , no] = smallPokemon.url.split('/');
        const pokemon = { name, no: +no };
        return this.pokemonModel.build(pokemon);
      },
    );

    await this.pokemonModel.insertMany(pokemonDocuments);
    return `Seed executed. ${limit} records saved to the database.`;
  }
}
