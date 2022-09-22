import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
