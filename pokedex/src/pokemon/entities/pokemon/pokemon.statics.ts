import { PokemonAttributes } from './pokemon.attributes';
import { PokemonDocument } from './pokemon.document';

export interface PokemonStatics {
  build(attrs: PokemonAttributes): PokemonDocument;
}
