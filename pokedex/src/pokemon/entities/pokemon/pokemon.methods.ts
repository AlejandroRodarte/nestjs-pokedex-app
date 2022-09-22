import { PokemonAttributes } from './pokemon.attributes';
import { PokemonDocument } from './pokemon.document';
export interface PokemonMethods {
  updateFields(attrs: Partial<PokemonAttributes>): PokemonDocument;
}
