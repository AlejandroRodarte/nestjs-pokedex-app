import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PokemonAttributes } from './pokemon.attributes';
import { PokemonDocument } from './pokemon.document';
import { PokemonModel } from './pokemon.model';

@Schema()
export class Pokemon {
  @Prop({
    unique: true,
    index: true,
  })
  public name: string;

  @Prop({
    unique: true,
    index: true,
  })
  public no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

PokemonSchema.static(
  'build',
  function (attrs: PokemonAttributes): PokemonDocument {
    const pokemonModel = this as any as PokemonModel;
    return new pokemonModel(attrs);
  },
);

PokemonSchema.method(
  'updateFields',
  function (attrs: Partial<PokemonAttributes>): PokemonDocument {
    const pokemonDocument = this as PokemonDocument;
    if (attrs.name) pokemonDocument.name = attrs.name.toLowerCase();
    if (attrs.no) pokemonDocument.no = attrs.no;
    return pokemonDocument;
  },
);
