import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly LIMIT = 1;
  private readonly axios: AxiosInstance = axios;

  async populate() {
    const res = await this.axios.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${this.LIMIT}`,
    );
    const pokemons = res.data.results.map((smallPokemon) => {
      const name = smallPokemon.name;
      const [, , , , , , no] = smallPokemon.url.split('/');
      return { name, no: +no };
    });
    return res.data;
  }
}
