import { Document } from 'mongoose';
import { Pokemon } from './pokemon.schema';
import { PokemonMethods } from './pokemon.methods';

export type PokemonDocument = Pokemon & Document & PokemonMethods;
