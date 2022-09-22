import { Model } from 'mongoose';
import { PokemonDocument } from './pokemon.document';
import { PokemonStatics } from './pokemon.statics';

export type PokemonModel = Model<PokemonDocument> & PokemonStatics;
